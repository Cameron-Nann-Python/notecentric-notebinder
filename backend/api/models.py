from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

# Create your models here.

# Class Model
class Class(models.Model):
    name = models.CharField(max_length=30)
    owner = models.ForeignKey(
        # Deleting user deletes all user's classes
        "auth.User", on_delete=models.CASCADE
    )

# Module Model
class Module(models.Model):
    name = models.CharField(max_length=30)
    class_folder = models.ForeignKey(
        # Deleting class deletes all its modules
        Class, on_delete=models.CASCADE
    )

class Note(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE, 
        related_name="notes")
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title