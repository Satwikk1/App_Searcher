from rest_framework import serializers
from rest_framework.fields import CharField
from .objects import *


class PlayStoreSerializer(serializers.Serializer):
    packageName = serializers.CharField()


class AppStoreSerializer(serializers.Serializer):
    appName = CharField()
    appId = CharField()


class KeywordFindSerializer(serializers.Serializer):
    url = CharField()
