from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.generics import ListAPIView 
from .serializers import ToDo, ToDoSerializer


class GetProducts(ListAPIView): 
    queryset = ToDo.objects.all() 
    serializer_class = ToDoSerializer