from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('calculate/', calculate, name = 'calculate'),
]
