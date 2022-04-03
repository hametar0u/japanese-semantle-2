from django.db import models

# Create your models here.

class Todo(models.Model):
  title = models.CharField(max_length=70)

  def __str__(self):
    return title

class Word(models.Model):
  word_text = models.CharField(max_length=255)

  def __str__(self):
    return self.word_text

class Top1000(models.Model):
  word = models.ForeignKey(Word, on_delete=models.CASCADE)
  top1000word = models.CharField(max_length=255)
  score = models.DecimalField(max_digits=10, decimal_places=4)

  def __str__(self):
    return self.top1000word + ', ' + str(self.score)


