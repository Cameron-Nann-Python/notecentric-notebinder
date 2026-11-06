from django.test import TestCase
from django.urls import reverse
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

# Use this fixture to test registered admins
@pytest.fixture
def registered_admin():
    return User.objects.create_superuser(
        username="admin",
        email="",
        password="Cervantes!"
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


@pytest.mark.django_db
def test_usr_14(client, registered_admin):
    """
    Tests if admin can login properly.
    """
    admin_login = client.login(
        username="admin",
        password="Cervantes!"
    )
    assert admin_login

@pytest.mark.django_db
def test_usr_16(client, registered_admin, registered_user):
    """
    Tests if admin can delete a registered user.
    """
    client.force_login(registered_admin)

    # get URL for User model's admin changelist
    changelist_url = reverse("admin:auth_user_changelist")

    # form data payload
    data = {
        "action" : "delete_selected",
        "_selected_action" : [str(registered_user.pk)],
        "post" : "yes"
    }

    response = client.post(changelist_url, data, follow=True)

    # Ensure successful POST request and User removed
    assert response.status_code == 200
    assert not User.objects.filter(pk=registered_user.pk).exists()
