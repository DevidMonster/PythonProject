from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('post', PostViewset, basename='post')
router.register('category', CategoryViewset, basename='category')
urlpatterns = router.urls + [
    path('upload_image/', upload_images),
]

# urlpatterns = [
#     path('', home),
# ]