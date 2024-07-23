from django.db import models


class Product(models.Model): 
    name = models.CharField(max_length=1000) 
    product_code = models.CharField(max_length=50) 
    price = models.DecimalField(max_digits=20, decimal_places=2, null=True)
    stock = models.IntegerField() 
    image = models.ImageField(upload_to='product_image') 


#sale model   
#purchase model 

