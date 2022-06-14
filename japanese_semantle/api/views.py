from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from .serializers import TodoSerializer
from rest_framework.response import Response
from .models import Word

import random
import datetime

from .models import Todo
# Create your views here.


class TodoListView(generics.ListAPIView):
  model = Todo
  serializer_class = TodoSerializer

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

@api_view(['POST'])
def evaluate_word(request, word):

  return Response(word)
