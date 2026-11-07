from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Class
from api.models import Module
from typing import Any

from .models import Note

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        """
        Returns a network response of access token, response token, is_superuser.
        Disregard the warning.
        """
        # get dictionary of access token and response token
        data: dict[str, Any] = super().validate(attrs)
        # add is_superuser field for admin
        data["is_superuser"] = self.user.is_superuser

        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password" : {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author", "module"]
        extra_kwargs = {"author": {"read_only": True}}
class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ["id", "name"]

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ["id", "name", "class_folder"]
