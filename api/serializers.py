#provides mechanism for translating django models into other formats
from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = ('id', 'title',)