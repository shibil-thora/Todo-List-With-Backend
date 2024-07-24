from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.generics import ListAPIView, CreateAPIView
from .serializers import ToDo, ToDoSerializer, UserSerializer 
from django.contrib.auth import authenticate    
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth.models import User


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
        print(request.data)
        todo.name = new_name
        todo.save()
        return Response('set') 
    

class DeleteToDo(APIView): 
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
        validate_is_premium(user)
        user_data = UserSerializer(user) 
        user_dict = user_data.data
        area = None 
        try: 
            area_obj = user.area.area 
            area = AreaSerializer(area_obj).data
        except: 
            pass
        response_data = None
        if isinstance(user, AnonymousUser): 
            response_data = {
                'user': {
                    'username': None,
                    'email': None, 
                    'is_authenticated': None,
                    'is_active': None,  
                    'is_superuser': None,
                    'is_premium': None, 
                    'is_provider': None,
                    'area': area,
                    'pro_pic': None
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
                    'is_provider': user_dict['is_provider'], 
                    'is_premium': user_dict['is_premium'], 
                    'area': area,
                    'pro_pic': user_dict['profile_picture']
                }
            }
        return Response(response_data) 