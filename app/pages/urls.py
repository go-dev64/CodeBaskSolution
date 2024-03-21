from django.urls import include, path

from . import views
from .views import home_router

app_name = "pages"

urlpatterns = [
    path("", include(home_router.urls)),
    path("projects/", views.projects_list, name="projects"),
    path("projects/<int:id>/", views.project_detail, name="project_detail"),
]
