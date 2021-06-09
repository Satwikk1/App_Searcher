from django.shortcuts import render
from rest_framework import serializers, viewsets
from rest_framework.response import Response
from .serializers import AppStoreSerializer, PlayStoreSerializer, KeywordFindSerializer
from google_play_scraper import app
from rest_framework.renderers import JSONRenderer
import json
import requests
from bs4 import BeautifulSoup
from .models import URL, Keywords
from itunes_app_scraper.scraper import AppStoreScraper


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
        serializer.is_valid()
        app_name = serializer.data['appName']
        app_id = serializer.data['appId']
        scraper = AppStoreScraper()
        if app_name != '':
            result = scraper.get_app_ids_for_query(app_name, 1)[0]
            result = scraper.get_app_details(result)
            json = JSONRenderer().render(result)
            return Response(json)
        elif app_id != '':
            result = scraper.get_app_details(app_id)
            json = JSONRenderer().render(result)
            return Response(json)
        return Response(serializer.error_messages)


class KeywordFindView(viewsets.ViewSet):

    def create(self, request):

        def ReturnDataDict():
            pass

        def ModelData(url, keywords):
            previousURL = URL.objects.filter(url=url).exists()
            if previousURL == False:
                keywords = list(keywords.split(','))
                foreignUrl = URL(url=url)
                foreignUrl.save()
                print(foreignUrl.url)
                for i in keywords:
                    Keywords(keyword=i, url=foreignUrl).save()
            else:
                similarUrls = {}
                for keyword in keywords:
                    for url in Keywords.objects.filter(keyword=keyword):
                        similarUrls[keyword].append(url.url)

        serializer = KeywordFindSerializer(data=request.POST)
        if(serializer.is_valid()):
            Url = serializer.data['url']
            req = requests.get(url=Url)
            resp = req.text
            soup = BeautifulSoup(resp, "html5lib")
            keywords = soup.find_all(name="meta")
            data = ''
            for i in keywords:
                if str(i).find(('keywords')) != -1:
                    data = i['content']
                    ModelData(Url, data)

                    json = JSONRenderer().render(data)
                    return Response(json)

        return Response(serializer.error_messages)
