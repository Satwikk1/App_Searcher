from django.db import models
from django.db.models.base import Model
from django.db.models.fields.related import ForeignKey

# Create your models here.


class URL(models.Model):
    url = models.CharField(max_length=500)

    def __str__(self):
        return self.url


class Keywords(models.Model):
    keyword = models.CharField(max_length=100)
    url = models.ForeignKey(URL, on_delete=models.CASCADE)

    def __str__(self):
        return self.keyword
