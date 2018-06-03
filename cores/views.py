from rest_framework import generics

from . import models
from . import serializers


class ListCores(generics.ListCreateAPIView):
    queryset = models.Core.objects.all()
    serializer_class = serializers.CoreSerializer


class CoreDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Core.objects.all()
    serializer_class = serializers.CoreSerializer


class ListSurveys(generics.ListCreateAPIView):
    queryset = models.Survey.objects.all()
    serializer_class = serializers.SurveysSerializer


class SurveyDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Survey.objects.all()
    serializer_class = serializers.SurveySerializer
