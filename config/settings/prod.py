from .base import *
from .base import env

SECRET_KEY = env("SECRET_KEY")
DEBUG = False

ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS").split(",")

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": env("SQL_ENGINE", default="django.db.backends.postgresql"),
        "NAME": env("SQL_DATABASE", default="hello_django_prod"),
        "USER": env("SQL_USER", default="hello_django"),
        "PASSWORD": env("SQL_PASSWORD", default="hello_django"),
        "HOST": env("SQL_HOST", default="db"),
        "PORT": env("SQL_PORT", default="5432"),
    }
}
