from django.test import TestCase

# Create your tests here.
import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient

# Use this fixture to test client connection
@pytest.fixture
def client():
    return APIClient()

# Use this fixture to test users who have registered
@pytest.fixture
def registered_user():
    return User.objects.create_user(
        username="test_user",
        password="test_password"
    )

@pytest.mark.django_db # access fresh database
def test_usr_01(client):
    """
    Tests if user can successfully register their account.
    """
    response = client.post(
        "/api/user/register/",
        {
            "username" : "test_user",
            "password" : "test_password"
        },
        format = "json"
    )
    assert response.status_code == 201
    assert User.objects.filter(username="test_user").exists()

@pytest.mark.django_db
def test_usr_02(client, registered_user):
    """
    Tests if user can successfully login to their account.
    User needs access token for successful login.
    """
    response = client.post(
        "/api/token/",
        {
            "username" : "test_user",
            "password" : "test_password"
        },
        format = "json"
    )
    assert response.status_code == 200
    assert "access" in response.data