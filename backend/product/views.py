from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.generics import ListAPIView 
from .serializers import Product, ProductSerializer


class GetProducts(ListAPIView): 
    queryset = Product.objects.all() 
    serializer_class = ProductSerializer