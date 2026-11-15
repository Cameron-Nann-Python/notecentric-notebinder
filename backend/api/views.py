from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser

from .serializers import UserSerializer, NoteSerializer, ClassSerializer, ModuleSerializer
from .models import Note, Class, Module

# Create your views here.
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = Note
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ClassListCreate(generics.ListCreateAPIView):
    serializer_class = ClassSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Class.objects.filter(owner=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class ModuleListCreate(generics.ListCreateAPIView):
    serializer_class = ModuleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # class_folder__owner from docs.djangoproject: Making Queries, Lookups that span relationships
        return Module.objects.filter(class_folder__owner=user)

class AdminUserList(generics.ListAPIView):
    queryset = User.objects.all().order_by("username")
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class AdminClassList(generics.ListAPIView):
    serializer_class = ClassSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Class.objects.filter(
            owner_id=self.kwargs["user_id"]
        )

class AdminModuleList(generics.ListAPIView):
    serializer_class = ModuleSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Module.objects.filter(
            class_folder__owner_id=self.kwargs["user_id"]
        )


# Admin: Retrieve selected user's notes
class AdminNoteList(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Note.objects.filter(
            author_id=self.kwargs["user_id"]
        )


# Admin: Delete any user's note
class AdminNoteDelete(generics.DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAdminUser]