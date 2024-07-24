from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.generics import ListAPIView, CreateAPIView
from .serializers import ToDo, ToDoSerializer, UserSerializer 
from django.contrib.auth import authenticate    
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth.models import User 
from django.contrib.auth.models import AnonymousUser 
from rest_framework.permissions import IsAuthenticated


class GetProducts(ListAPIView): 
    permission_classes = [IsAuthenticated]
    def get(self, request): 
        todo = ToDo.objects.filter(user=request.user)
        todo_data = ToDoSerializer(todo, many=True).data
        return Response(todo_data)  


class CreateToDo(APIView): 
    permission_classes = [IsAuthenticated]
    def post(self, request): 
        print(request.data) 
        todo = ToDo.objects.create(user=request.user, name=request.data.get('name')) 
        todo_data = ToDoSerializer(todo).data
        return Response(todo_data)


class MarkComplete(APIView): 
    permission_classes = [IsAuthenticated]
    def post(self, request):  
        todo = ToDo.objects.get(id=request.data.get('id')) 
        todo.completed = True 
        todo.save()
        return Response('set')  
    


class EditToDo(APIView): 
    permission_classes = [IsAuthenticated]
    def post(self, request):  
        todo = ToDo.objects.get(id=request.data.get('id'))  
        new_name = request.data.get('name') 
        print(request.data)
        todo.name = new_name
        todo.save()
        return Response('set') 
    

class DeleteToDo(APIView): 
    permission_classes = [IsAuthenticated]
    def post(self, request):  
        todo = ToDo.objects.filter(id=request.data.get('id')) 
        todo.delete()
        return Response('set') 
    

class LoginUser(APIView): 
    def post(self, request): 
        username = request.data.get('username')
        email = request.data.get('email') 
        try:
            user = User.objects.get(email=email, username=username) 
        except: 
            user = User.objects.create_user(email=email, username=username)
            
        
        refresh = RefreshToken.for_user(user) 
        access = refresh.access_token 
        user_data = UserSerializer(user) 
        user_dict = user_data.data 

        response_data = {
            'refresh': str(refresh),
            'access': str(access), 
            'user': {
                'username': user_dict['username'],
                'email': user_dict['email'], 
                'is_authenticated': user_dict['is_authenticated'],
                'is_active': user_dict['is_active'],  
                'is_superuser': user_dict['is_superuser'],
            }
        }
    
        return Response(response_data) 
    

class UserStatusView(APIView): 
    def get(self, request): 
        user = request.user 
        user_data = UserSerializer(user) 
        user_dict = user_data.data
        
        response_data = None
        if isinstance(user, AnonymousUser): 
            response_data = {
                'user': {
                    'username': None,
                    'email': None, 
                    'is_authenticated': None,
                    'is_active': None,  
                    'is_superuser': None,
                }   
            }
        else: 
            response_data = {
                'user': {
                    'username': user_dict['username'],
                    'email': user_dict['email'], 
                    'is_authenticated': user_dict['is_authenticated'],
                    'is_active': user_dict['is_active'],  
                    'is_superuser': user_dict['is_superuser'],
                }
            }
        return Response(response_data) 