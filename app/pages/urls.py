from django.urls import include, path

from .views import home_router

app_name = "pages"

urlpatterns = [
    path("", include(home_router.urls)),
]
