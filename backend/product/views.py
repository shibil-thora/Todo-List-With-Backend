from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.generics import ListAPIView, CreateAPIView
from .serializers import ToDo, ToDoSerializer


class GetProducts(ListAPIView): 
    queryset = ToDo.objects.all() 
    serializer_class = ToDoSerializer 


class CreateToDo(CreateAPIView): 
    queryset = ToDo.objects.all() 
    serializer_class = ToDoSerializer 


class MarkComplete(APIView): 
    def post(self, request):  
        todo = ToDo.objects.get(id=request.data.get('id')) 
        todo.completed = True 
        todo.save()
        return Response('set')  
    


class EditToDo(APIView): 
    def post(self, request):  
        todo = ToDo.objects.get(id=request.data.get('id'))  
        new_name = request.data.get('name') 
        print(new_name)
        todo.name = new_name
        todo.save()
        return Response('set') 
    

class DeleteToDo(APIView): 
    def post(self, request):  
        todo = ToDo.objects.filter(id=request.data.get('id')) 
        todo.delete()
        return Response('set')