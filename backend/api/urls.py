from django.urls import path

from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'todos', views.TodoView, 'todo')

urlpatterns = [
  # path('load_daily_top_1000/<int:key>', views.load_daily_top_1000, name="load_daily_top_1000"),
  path('evaluate_word/<str:word>', views.evaluate_word, name="evaluate_word"),
  path('new_game', views.new_game, name="new_game"),
  path('get_tiers', views.get_tiers, name="get_tiers"),
]