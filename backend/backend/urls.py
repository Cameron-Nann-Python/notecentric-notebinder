from django.contrib import admin
from django.urls import path, include

from api.views import CreateUserView
# Verify that getting a token works
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.serializers import MyTokenObtainPairSerializer

# Allow is_superuser to be added to serializer
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

urlpatterns = [
    path("admin/", admin.site.urls, name="admin"),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", MyTokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls"))
]
