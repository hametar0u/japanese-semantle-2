from django.contrib import admin
from .models import Word

# Register your models here.
class WordAdmin(admin.ModelAdmin):
  list = ('word_text', 'top1000_set')

admin.site.register(Word, WordAdmin)