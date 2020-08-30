from django.shortcuts import render
from rest_framework import viewsets

from .serializers import HeroSerializer, NasabahSerializer
from .models import Hero, Nasabah


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all().order_by('name')
    serializer_class = HeroSerializer

class NasabahViewSet(viewsets.ModelViewSet):
    queryset = Nasabah.objects.all().order_by('no_regis')
    serializer_class = NasabahSerializer