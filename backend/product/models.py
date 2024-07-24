from django.db import models


class ToDo(models.Model): 
    name = models.CharField(max_length=1000) 
    date = models.DateTimeField(auto_now=True) 
    completed = models.BooleanField(default=False) 

    class Meta: 
        ordering = ['id'] 

    def __str__(self): 
        return self.name



