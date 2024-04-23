import pytest
from django.test import Client
from django.urls import reverse
from pytest_django.asserts import assertContains, assertTemplateUsed

from app.pages.models import Project


class TesTHomeView:
    client = Client()

    def test_home_view(self):

        response = self.client.get(reverse("pages:home"))
        assert response.status_code == 200
        assertTemplateUsed(response, "pages/home/home.html")

    def test_hx__display_acces_button_to_contact_form(self):

        response = self.client.get(
            reverse("pages:hx__display_acces_button_to_contact_form")
        )
        assert response.status_code == 200
        assertTemplateUsed(
            response, "pages/home/hx/display-acces-button-to-contact-form.html"
        )

    def test_hx__display_form(self):

        response = self.client.get(reverse("pages:hx__display_form"))
        assert response.status_code == 200
        assertTemplateUsed(response, "pages/home/hx/display-form.html")

    def test_hx__submit_contact_form(self):

        response = self.client.post(reverse("pages:hx__submit_contact_form"))
        assert response.status_code == 200
        assertTemplateUsed(response, "pages/home/hx/submit-contact-form--error.html")


class TestAboutView:
    def test_about(self):
        client = Client()
        response = client.get(reverse("pages:about"))
        assert response.status_code == 200
        assertTemplateUsed(response, "pages/about/about.html")


class TestProjectsView:
    client = Client()

    @pytest.mark.django_db
    def test_projects_list(self):
        Project.objects.create(
            title="Test Project 1",
            resume="Test Resume 1",
            body="Test Description 1",
            slug="test",
        )
        response = self.client.get(reverse("pages:projects_list"))
        assert response.status_code == 200
        assertTemplateUsed(response, "pages/project/projects_list.html")
        assert len(response.context["projects_list"]) == 1
        assert response.context["projects_list"][0].title == "Test Project 1"

    @pytest.mark.django_db
    def test_project_detail(self):
        Project.objects.create(
            title="Test",
            slug="test",
            resume="Test Resume 1",
            body="Test Description 1",
        )
        response = self.client.get(
            reverse("pages:project_detail", kwargs={"slug": "test"})
        )
        assert response.status_code == 200
        assertTemplateUsed(response, "pages/project/detail.html")
        assert response.context["project"].title == "Test"
        assert response.context["project"].resume == "Test Resume 1"
        assertContains(response, "Test Description 1")
