# Generated by Django 4.0.6 on 2022-07-23 17:38

from django.db import migrations
import numpy as np
from tqdm import tqdm
import sparknlp
from sparknlp.base import *
from sparknlp.annotator import *
from pyspark.ml import Pipeline

def main(apps, schema_editor):

    sparknlp.start()
    from pyspark.context import SparkContext
    from pyspark.sql.session import SparkSession
    sc = SparkContext.getOrCreate()
    spark = SparkSession(sc)

    documentAssembler = DocumentAssembler() \
    .setInputCol("text") \
    .setOutputCol("document")

    sentence = SentenceDetector() \
    .setInputCols(["document"]) \
    .setOutputCol("sentence")

    word_segmenter = WordSegmenterModel.pretrained("wordseg_gsd_ud", "ja") \
    .setInputCols(["sentence"]) \
    .setOutputCol("token")

    lemmatizer = LemmatizerModel.pretrained("lemma", "ja") \
    .setInputCols(["token"]) \
    .setOutputCol("lemma")

    embeddings = WordEmbeddingsModel.pretrained("japanese_cc_300d", "ja") \
    .setInputCols("sentence", "token") \
    .setOutputCol("embeddings")

    pipeline = Pipeline().setStages([
    documentAssembler,
    sentence,
    word_segmenter,
    # lemmatizer,
    embeddings
    ])

    import math
    def sigmoid(x):
        if x == 1:
            return 100
        return 100 * np.tanh(x)
    def score(a, b):
        a = np.array(a)
        b = np.array(b)
        x = a * b
        x = sum(x) / math.sqrt(sum(a*a)*sum(b*b))
        x = round(x, 6)
    #     return x
        return sigmoid(x)

    from enum import Enum
    class KeyType(Enum):
        INVALID = 1
        HASHTAG = 2
        VALID = 0
    def isValidKey(key): 
        if len(key) == 0:
            return KeyType.INVALID
        elif key[0] == '#':
            return KeyType.HASHTAG
        for char in key:
            if ord(char) <= 128:
                return KeyType.INVALID
        else:
            return KeyType.VALID

    # read data into dict
    word_list = []

    with open('/Users/bigsad/Downloads/jawiki.all_vectors.300d.txt') as f:
        line = f.readline()
        nWords, vecSize = line.split(' ')
        nWords = int(nWords)
        vecSize = int(vecSize)

        for i in tqdm(range(nWords)):
            line = f.readline()
            line = line[:-1] # remove newline
            arr = line.split(' ')
            # first element is the japanese word and the rest are the vector values
            key = arr[0]
            
            if isValidKey(key) == KeyType.INVALID:
                pass
            elif isValidKey(key) == KeyType.HASHTAG:
                key = key[2:-2]
                word_list.append([key])
            else:
                word_list.append([key])

    from bs4 import BeautifulSoup
    import requests as req

    urls = [
            "https://japanesetest4you.com/jlpt-n1-vocabulary-list/",
            "https://japanesetest4you.com/jlpt-n2-vocabulary-list/",
            "https://japanesetest4you.com/jlpt-n3-vocabulary-list/",
            "https://japanesetest4you.com/jlpt-n4-vocabulary-list/",
            "https://japanesetest4you.com/jlpt-n5-vocabulary-list/",
            "https://japanesetest4you.com/jlpt-n1-grammar-list/",
            "https://japanesetest4you.com/jlpt-n2-grammar-list/",
            "https://japanesetest4you.com/jlpt-n3-grammar-list/",
            "https://japanesetest4you.com/jlpt-n4-grammar-list/",
            "https://japanesetest4you.com/jlpt-n5-grammar-list/",
        ]
    target_words = set()
    words = list()

    for url in urls:
        content = req.get(url).text
        soup = BeautifulSoup(content, 'lxml')
        
        for div in soup.find_all('div', class_='entry clearfix'):
            for p in tqdm(div.find_all('p')):
                word = p.text.split(' ')[0]
                if isValidKey(word):
                    words.append([word])
                
    data = spark.createDataFrame(words).toDF("text")
    model = pipeline.fit(data)
    result = model.transform(data)
    result = result.select('embeddings').collect()

    # print(result[0].embeddings)

    for res in tqdm(result):
        if len(res.embeddings) == 1 and sum(res.embeddings[0].embeddings) != 0.0:
            target_words.add(res.embeddings[0].result)


    url = "https://kyoan.u-biq.org/tangosearch.html"
    content = req.get(url)
    content = req.get(url).text
    content = content.encode('latin1')
    soup = BeautifulSoup(content, 'lxml')

    table = soup.find_all('table', class_='hyou')

    words = list()

    for t in soup.find_all('table', class_='hyou'):
        for td in tqdm(t.tbody.find_all('td')):
            if td.text and td.text[0] == '(':
                word = td.text.split(')')[1]
            else:
                word = td.text
            
            if isValidKey(word):
                words.append([word])
                
    data = spark.createDataFrame(words).toDF("text")
    model = pipeline.fit(data)
    result = model.transform(data)
    result = result.select('embeddings').collect()

    for res in tqdm(result):
        if len(res.embeddings) == 1 and sum(res.embeddings[0].embeddings) != 0.0:
            target_words.add(res.embeddings[0].result)


    splitters = [ i for i in range(0, len(word_list), 100000) ]
    splitters.append(len(word_list))
    vector_list = list()

    for i in range(len(splitters) - 1):
        data = spark.createDataFrame(word_list[splitters[i]:splitters[i+1]]).toDF("text")
        model = pipeline.fit(data)
        result = model.transform(data)
        result = result.select('embeddings').collect()

        for res in tqdm(result):
            if len(res.embeddings) > 0:
                vector_list.append(res.embeddings[0].embeddings)


    import hnswlib
    def fit_hnsw_index(features, ef=100, M=16, save_index_file=False):
        # Convenience function to create HNSW graph
        # features : list of lists containing the embeddings
        # ef, M: parameters to tune the HNSW algorithm
        
        num_elements = len(features)
        labels_index = np.arange(num_elements)
        EMBEDDING_SIZE = len(features[0])
        
        # Declaring index
        # possible space options are l2, cosine or ip
        p = hnswlib.Index(space='cosine', dim=EMBEDDING_SIZE)
        
        # Initing index - the maximum number of elements should be known
        p.init_index(max_elements=num_elements, ef_construction=ef, M=M)
        
        # Element insertion
        int_labels = p.add_items(features, labels_index)
        
        # Controlling the recall by setting ef
        # ef should always be > k
        p.set_ef(ef) 
        
        # If you want to save the graph to a file
        if save_index_file:
            p.save_index(save_index_file)
        
        return p


    from datetime import datetime
    k = 1000
    n = 1000000
    ann_start = datetime.now()
    p = fit_hnsw_index(vector_list[:n], ef=k*10)
    ann_neighbor_indices, ann_distances = p.knn_query(vector_list[0], k)
    ann_end = datetime.now()
    print(f"ran in {(ann_end - ann_start).total_seconds()} seconds")


    target_word_list = list()
    target_vector_list = list()
    for word in target_words:
        target_word_list.append([word])
        
    data = spark.createDataFrame(target_word_list).toDF("text")
    model = pipeline.fit(data)
    result = model.transform(data)
    result = result.select('embeddings').collect()

    for res in tqdm(result):
        target_vector_list.append(res.embeddings[0].embeddings)

    ann_neighbor_indices, ann_distances = p.knn_query(target_vector_list, k)

    from django.db import migrations
    from api.models import Word

    Word = apps.get_model('api', 'Word')

    for i in range(len(ann_neighbor_indices)):
        vec = target_vector_list[i]
        top25vec = vector_list[ann_neighbor_indices[i][25]]
        top100vec = vector_list[ann_neighbor_indices[i][100]]
        top500vec = vector_list[ann_neighbor_indices[i][500]]
        top1000vec = vector_list[ann_neighbor_indices[i][999]]

        tiers = [score(vec, top25vec), score(vec, top100vec), score(vec, top500vec), score(vec, top1000vec)]

        w = Word(word=target_word_list[i], tiers=tiers)
        w.save()




class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(main)
    ]
