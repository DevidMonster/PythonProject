from django.db import models
from django.utils.text import slugify

# Create your models here.
class Category(models.Model):
    name = models.CharField(unique=True, max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.name
    
class Image(models.Model):
    url = models.URLField()
    
    def __str__(self):
        return self.url

class Post(models.Model):
    title = models.CharField(max_length=200)
    subTitle = models.CharField(max_length=200)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE , blank=True, null=True)
    status = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    images = models.ManyToManyField(Image, blank=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.title
    