from django.shortcuts import render
from rest_framework import serializers, viewsets
from rest_framework.response import Response
from .serializers import AppStoreSerializer, PlayStoreSerializer
from google_play_scraper import app
from rest_framework.renderers import JSONRenderer
import json


class playStoreView(viewsets.ViewSet):

    def create(self, request):
        serializer = PlayStoreSerializer(data=request.POST)
        if serializer.is_valid():
            packageName = serializer.data['packageName']
            result = app(packageName)
            result = JSONRenderer().render(result)
            return Response(result)
        return Response(serializer.error_messages)


class appStoreView(viewsets.ViewSet):

    def create(self, request):
        serializer = AppStoreSerializer(data=request.POST)
        if(serializer.is_valid()):
            app_name = serializer.data['appName']
            app_id = serializer.data['appId']

            return Response(serializer.error_messages)
        return Response(serializer.error_messages)
