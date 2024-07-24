from django.urls import path 
from . import views

urlpatterns = [
    path('getTodos/', views.GetProducts.as_view()), 
    path('create/', views.CreateToDo.as_view()), 
    path('complete/', views.MarkComplete.as_view()), 
    path('delete/', views.DeleteToDo.as_view()), 
    path('edit/', views.EditToDo.as_view()), 
    path('login_user/', views.LoginUser.as_view()),  
    path('user_status/', views.UserStatusView.as_view()), 
]
