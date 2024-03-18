from django.urls import path

from .views import ContactFormView, home_view

app_name = "pages"

urlpatterns = [
    path("", home_view, name="home"),
    path("contact/", ContactFormView.as_view(), name="contact"),
]
