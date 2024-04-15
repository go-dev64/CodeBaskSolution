from django.urls import include, path

from .views import about, home_router, project_detail, projects_list

app_name = "pages"

urlpatterns = [
    path("about/", about, name="about"),
    path("projects_list/", projects_list, name="projects_list"),
    path("projects/<slug:slug>/", project_detail, name="project_detail"),
    path("", include(home_router.urls)),
]
