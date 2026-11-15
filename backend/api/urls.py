from django.urls import path
from . import views

urlpatterns = [
    # Normal Users
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("classes/", views.ClassListCreate.as_view(), name='class-list'),
    path("modules/", views.ModuleListCreate.as_view(), name="module-list"),

    # Admin Users
    path("admin/users/", views.AdminUserList.as_view(), name="admin-users"),
    path("admin/users/<int:user_id>/classes/", views.AdminClassList.as_view()),
    path("admin/users/<int:user_id>/modules/", views.AdminModuleList.as_view()),
    path("admin/users/<int:user_id>/notes/", views.AdminNoteList.as_view()),
    path("admin/notes/delete/<int:pk>/", views.AdminNoteDelete.as_view()),
]