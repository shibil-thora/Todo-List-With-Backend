from django.db import models
from django.contrib.auth.models import User


class ToDo(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=1000) 
    date = models.DateTimeField(auto_now=True) 
    completed = models.BooleanField(default=False) 

    class Meta: 
        ordering = ['id'] 

    def __str__(self): 
        return self.name



