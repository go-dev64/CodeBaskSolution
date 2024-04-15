from django.urls import resolve, reverse

from app.pages.views import about, home_view, project_detail, projects_list


class TestUrls:
    def test_home_url(self):
        path = reverse("pages:home")
        assert resolve(path).view_name == "pages:home"
        assert resolve(path).func == home_view

    def test_about_url(self):
        path = reverse("pages:about")
        assert resolve(path).view_name == "pages:about"
        assert resolve(path).func == about

    def test_projects_list_url(self):
        path = reverse("pages:projects_list")
        assert resolve(path).view_name == "pages:projects_list"
        assert resolve(path).func == projects_list

    def test_project_detail_url(self):
        path = reverse("pages:project_detail", kwargs={"slug": "test-slug"})
        assert resolve(path).view_name == "pages:project_detail"
        assert resolve(path).kwargs["slug"] == "test-slug"
        assert resolve(path).func == project_detail
