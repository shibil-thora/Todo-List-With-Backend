from rest_framework import serializers 
from .models import ToDo 
from django.contrib.auth.models import User


class ToDoSerializer(serializers.ModelSerializer): 
    class Meta:  
        model = ToDo 
        fields = '__all__'  


class UserSerializer(serializers.ModelSerializer): 
    class Meta:  
        model = User 
        fields = [
            'id', 
            'username', 
            'email', 
            'is_authenticated', 
            'is_active', 
            'is_superuser',  
        ] 