from rest_framework import generics

from . import models
from . import serializers


class ListCores(generics.ListCreateAPIView):
    queryset = models.Core.objects.all()
    serializer_class = serializers.CoreSerializer


class CoreDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Core.objects.all()
    serializer_class = serializers.CoreSerializer