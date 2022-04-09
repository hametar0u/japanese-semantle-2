from django.urls import path
from .views import TodoListView

from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'todos', views.TodoView, 'todo')

urlpatterns = [
  path('todo', TodoListView.as_view()),
  path('load_daily_top_1000', views.load_daily_top_1000, name="load_daily_top_1000")
]