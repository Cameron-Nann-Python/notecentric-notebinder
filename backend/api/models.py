from django.db import models

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