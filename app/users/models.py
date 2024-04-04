from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class User(AbstractUser):
    """
    Custom user model which doesn't have a username,
    but has a unique email and a date_of_birth.
    This model is used for both superusers and
    regular users as well.
    """

    # The inherited field 'username' is nullified, so it will
    # neither become a DB column nor will it be required.
    username = None
    email = models.EmailField(_("email address"), unique=True)
    # Set up the email field as the unique identifier for users.
    # This has nothing to do with the username
    # that we nullified above.
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
    ]  # The USERNAME_FIELD aka 'email' cannot be included here
    objects = CustomUserManager()

    def __str__(self):
        return self.email
