from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class DailyKey(models.Model):
  key = models.IntegerField()

class Word(models.Model):
  word = models.CharField(max_length=255)
  tiers = ArrayField(
    models.DecimalField(max_digits=10, decimal_places=6),
    size=4
  )

  def __str__(self):
    return f"{self.word}: 25: {self.tiers[0]}, 100: {self.tiers[1]}, 500: {self.tiers[2]}, 1000: {self.tiers[3]}"


