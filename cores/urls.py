from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListSurveys.as_view()),
    path('cores/<int:pk>/', views.CoreDetails.as_view()),
    path('cores', views.ListCores.as_view()),
    path('surveys', views.ListSurveys.as_view()),
]