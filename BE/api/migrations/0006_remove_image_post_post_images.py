# Generated by Django 5.0 on 2023-12-29 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_category_post_image_delete_project_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='post',
        ),
        migrations.AddField(
            model_name='post',
            name='images',
            field=models.ManyToManyField(blank=True, null=True, to='api.image'),
        ),
    ]
