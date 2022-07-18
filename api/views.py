from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from .serializers import TodoSerializer
from rest_framework.response import Response
from .models import Word, VectorWord, DailyKey
import sys
# from celery import Celery
# from celery.schedules import crontab

import random
import datetime
import numpy as np

from .models import Todo
# Create your views here.


class TodoListView(generics.ListAPIView):
  model = Todo
  serializer_class = TodoSerializer

#Todo: update the daily word
@api_view(['POST'])
def new_game(request):
  key = DailyKey(key=random.randrange(882,6063))
  key.save()
  request.session['key'] = random.randrange(882,6063)
  print(f"session: {request.session['key']}", file=sys.stderr)
  return Response(status=status.HTTP_200_OK)
  

@api_view(['GET'])
def load_daily_top_1000(request, key):
  if not key:
    key = random.randrange(882,6063)
  #for some reason pk goes from 882 to 6064
  if key < 882 or key > 6063:
    return Response(status=status.HTTP_404_NOT_FOUND)
  word = Word.objects.get(pk=key)
  dailyTop1000 = word.top1000_set.all()

  '''
  data structure:
  [
    {
      word: "word",
      score: 100,
      rank: 1,
    },
    {
      word: "words",
      score: 58,
      rank: 2,
    },
    ...
  ]
  '''
  data = []
  for i, w in enumerate(dailyTop1000):
    obj = {
      "word": w.top1000word,
      "score": w.score,
      "rank": 1000 - i
    }
    data.append(obj)

  return Response({"response": data})

def sigmoid(x):
    if x == 1:
        return 100
    return 100 * np.tanh(x)

def score(a, b):
    x = a * b
    x = sum(x) / (np.linalg.norm(a) * np.linalg.norm(b))
    x = round(x, 6)
    return sigmoid(x)

@api_view(['POST'])
def evaluate_word(request, word):
  # daily_key = DailyKey.objects.all().last().key
  daily_key = request.session.get('key')
  print(daily_key, file=sys.stderr)
  daily_word = Word.objects.get(pk=daily_key)
  top1000 = daily_word.top1000_set.all()
  
  is_top1000 = False

  for i, topword in enumerate(top1000):
    if word == topword.top1000word:
      if 1000 - i == 1:
        return Response(status=status.HTTP_302_FOUND)
      obj = {
        "word": word,
        "score": topword.score,
        "rank": 1000 - i
      }
      return Response(obj)

  #calculate score if not top 1000
  daily_word_vector = VectorWord.objects.filter(word_text=daily_word.word_text)[0].word_vec
  target_words = VectorWord.objects.filter(word_text=word)

  if len(target_words) == 0:
    return Response(status=status.HTTP_404_NOT_FOUND)
  target_word_vector = target_words[0].word_vec

  #typecast
  daily_word_vector = np.array(daily_word_vector).astype('float64')
  target_word_vector = np.array(target_word_vector).astype('float64')

  vscore = score(daily_word_vector, target_word_vector)
  obj = {
    "word": word,
    "score": vscore,
    "rank": None
  }
  return Response(obj)
