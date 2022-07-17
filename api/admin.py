from django.contrib import admin
from .models import Word, Top1000

# Register your models here.
class WordAdmin(admin.ModelAdmin):
  list = ('word_text', 'top1000_set')

class Top1000Admin(admin.ModelAdmin):
  list = ('word','top1000word','score')

admin.site.register(Word, WordAdmin)
admin.site.register(Top1000, Top1000Admin)