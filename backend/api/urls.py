from django.urls import path
from . import views

urlpatterns = [
    # Normal Users
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/share/<int:pk>/", views.NoteShare.as_view(), name="share-note"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("classes/", views.ClassListCreate.as_view(), name='class-list'),
    path("modules/", views.ModuleListCreate.as_view(), name="module-list"),
    path("notes/update/<int:pk>/", views.NoteUpdate.as_view(), name="update-note"),

    # Public Forum
    path("public/classes/", views.PublicClassList.as_view(), name="public-classes"),
    path("public/classes/<int:class_id>/modules/", views.PublicModuleList.as_view(), name="public-modules"),
    path("public/modules/<int:module_id>/notes/", views.PublicNoteList.as_view(), name="public-notes"),

    # Admin Users
    path("admin/users/", views.AdminUserList.as_view(), name="admin-users"),
    path("admin/users/<int:user_id>/classes/", views.AdminClassList.as_view()),
    path("admin/users/<int:user_id>/modules/", views.AdminModuleList.as_view()),
    path("admin/users/<int:user_id>/notes/", views.AdminNoteList.as_view()),
    path("admin/notes/delete/<int:pk>/", views.AdminNoteDelete.as_view()),
]