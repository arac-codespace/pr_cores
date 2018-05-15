from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListCores.as_view()),
    path('<int:pk>/', views.CoreDetails.as_view()),
]