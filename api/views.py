from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, HttpResponseNotFound
from django.views import View
from .models import Word, DailyKey
import json
# from celery import Celery
# from celery.schedules import crontab

import random
import datetime
import numpy as np

# Create your views here.
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()


#Todo: update the daily word
@api_view(['POST'])
def new_game(request):
  key = random.randrange(1,4375)
  while len(DailyKey.objects.filter(key=key)) > 0:
    key = random.randrange(1,4375)
  k = DailyKey(key=key)
  k.save()

  tiers = Word.objects.get(id=key).tiers

  return Response(tiers)
  

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
    return sigmoid(x)

def isValidWord(word):
  for char in word:
    if ord(char) <= 128:
      return False
  return True

import sparknlp
from sparknlp.base import *
from sparknlp.annotator import *
from pyspark.ml import Pipeline
from pyspark.context import SparkContext
from pyspark.sql.session import SparkSession

sparknlp.start()
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

@api_view(['POST'])
def evaluate_word(request, word):
  if not isValidWord(word):
    return Response(status=status.HTTP_404_NOT_FOUND)

  daily_key = DailyKey.objects.all().last().key
  daily_word = Word.objects.get(id=daily_key)

  if word == daily_word.word:
    return Response(status=status.HTTP_302_FOUND)

  data = spark.createDataFrame([[daily_word.word]]).toDF("text")
  model = pipeline.fit(data)
  result = model.transform(data)

  if len(result.select('embeddings').collect()[0].embeddings) != 1:
    return Response(status=status.HTTP_404_NOT_FOUND)
  
  daily_word_vector = np.array(result.select('embeddings').collect()[0].embeddings[0].embeddings).astype('float64')

  data = spark.createDataFrame([[word]]).toDF("text")
  model = pipeline.fit(data)
  result = model.transform(data)

  if len(result.select('embeddings').collect()[0].embeddings) != 1:
    return Response(status=status.HTTP_404_NOT_FOUND)
  
  target_word_vector = np.array(result.select('embeddings').collect()[0].embeddings[0].embeddings).astype('float64')

  vscore = score(daily_word_vector, target_word_vector)

  rank = None

  if vscore > daily_word.tiers[0]:
    rank = 25
  elif vscore > daily_word.tiers[1]:
    rank = 100
  elif vscore > daily_word.tiers[2]:
    rank = 500
  elif vscore > daily_word.tiers[3]:
    rank = 1000

  obj = {
    "word": word,
    "score": vscore,
    "rank": rank
  }
  return Response(obj)

@api_view(['GET'])
def get_tiers(request):
  daily_key = DailyKey.objects.all().last().key
  tiers = Word.objects.get(id=daily_key).tiers
  res = [{
    "tier": 25,
    "score": round(float(tiers[0]), 2)
  },{
    "tier": 100,
    "score": round(float(tiers[1]), 2)
  },{
    "tier": 500,
    "score": round(float(tiers[2]), 2)
  },{
    "tier": 1000,
    "score": round(float(tiers[3]), 2)
  }]
  return Response(res)