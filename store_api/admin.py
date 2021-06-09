from store_api.models import Keywords
from django.contrib import admin
from .models import URL, Keywords

# Register your models here.

admin.site.register(URL)
admin.site.register(Keywords)
