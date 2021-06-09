

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from store_api.views import appStoreView, playStoreView, KeywordFindView


router = routers.DefaultRouter()
router.register(r'', playStoreView, 'store_api_playstore')
router.register(r'appStore', appStoreView, 'store_api_appstore')
router.register(r'webKeywords', KeywordFindView, 'webKeyword')
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
