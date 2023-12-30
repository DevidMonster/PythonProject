from rest_framework import serializers
from .models import *
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')
        
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'url')

class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'title', 'images', 'subTitle', 'category', 'content', 'status', 'slug')

        