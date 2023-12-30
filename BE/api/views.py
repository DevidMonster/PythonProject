from datetime import datetime
import json
from venv import logger
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .firebase_utils import upload_images_to_firebase

# Create your views here.
@csrf_exempt
def upload_images(request):
    if request.method == 'POST' and request.FILES.getlist('images'):
        uploaded_images = request.FILES.getlist('images')
        fileNames = []
        file_objs = []

        for uploaded_image in uploaded_images:
            # Bạn có thể trực tiếp sử dụng uploaded_image.name để lấy tên file
            fileNames.append(uploaded_image.name)
            file_objs.append(uploaded_image)


        # Gọi hàm để tải ảnh lên Firebase Storage và lấy URL
        image_urls = upload_images_to_firebase(fileNames, file_objs)

        # Trả về URL của ảnh
        return HttpResponse(json.dumps({'status': 'success', 'image_urls': image_urls}), content_type='application/json')
    else:
        return HttpResponse({'status': 'error'})
    
class CategoryViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = CategorySerializer
    
    def list(self, request):
        queryset = Category.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 400)

    def retrieve(self, request, pk=None):
        project = Category.objects.all().get(pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = Category.objects.all().get(pk=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 400)

    # def partial_update(self, request, pk=None):
    #     pass

    def destroy(self, request, pk=None):
        project = Category.objects.all().get(pk=pk)
        project.delete()
        return Response(status=204)

class PostViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = PostSerializer
    
    def list(self, request):
        queryset = Post.objects.prefetch_related('category', 'images').all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Extract the category ID from the request data
            category_id = request.data.get('category')

            # Attempt to get the category instance
            try:
                category = Category.objects.get(id=category_id)
            except Category.DoesNotExist:
                return Response({"error": "Category not found"}, status=400)
            
            post = serializer.save(category=category)
            # Xử lý hình ảnh cho bài viết mới
            image_urls = request.data.get('images', []) 
            post.images.all().delete()  # Xóa tất cả các ảnh cũ

            # Thêm ảnh mới từ danh sách URL
            for image in image_urls:
                post.images.create(url=image['url'])
                
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 400)

    def retrieve(self, request, pk=None):
        project = Post.objects.prefetch_related('category', 'images').get(pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = Post.objects.select_related('category').get(pk=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            # Extract the category ID from the request data
            category_id = request.data.get('category')

            # Attempt to get the category instance
            try:
                category = Category.objects.get(id=category_id)
            except Category.DoesNotExist:
                return Response({"error": "Category not found"}, status=400)
            
            post = serializer.save(category=category)
            # Xử lý hình ảnh cho bài viết mới
            image_urls = request.data.get('images', []) 
            post.images.all().delete()  # Xóa tất cả các ảnh cũ
            
            # Thêm ảnh mới từ danh sách URL
            for image in image_urls:
                print(image)
                post.images.create(url=image['url'])
                
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 400)

    # def partial_update(self, request, pk=None):
    #     pass

    def destroy(self, request, pk=None):
        project = Post.objects.select_related('category').get(pk=pk)
        project.delete()
        return Response(status=204)