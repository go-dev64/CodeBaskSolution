from django.contrib import messages
from django.shortcuts import get_object_or_404, render
from django.template.response import TemplateResponse

from app.pages.models import Category, Project

from ..utils.routers import Router
from .forms import ContactForm

home_router = Router()


@home_router.get(url_name="home", url_path=" ")
def home_view(request):

    return TemplateResponse(
        request,
        "pages/home/home.html",
    )


@home_router.get
def hx__display_acces_button_to_contact_form(request):
    return TemplateResponse(
        request, "pages/home/hx/display-acces-button-to-contact-form.html"
    )


@home_router.get
def hx__display_form(request):
    form = ContactForm()
    return TemplateResponse(
        request,
        "pages/home/hx/display-form.html",
        {"form": form},
    )


@home_router.post
def hx__submit_contact_form(request):
    form = ContactForm(request.POST)
    if not form.is_valid():
        messages.error(request, "Veuillez corriger les erreurs ci-dessous.")
        return TemplateResponse(
            request,
            "pages/home/hx/submit-contact-form--error.html",
            {"form": form},
            headers={"HX-Swap": "none"},  # type: ignore
        )
    form.save()

    messages.success(request, "Votre demande a bien été envoyé!")
    return TemplateResponse(
        request, "pages/home/hx/submit-contact-form--success.html", {"form": form}
    )


@home_router.get(
    url_name="about",
)
def about(request):
    return TemplateResponse(request, "pages/about/about.html")


@home_router.get(
    url_name="projects_list",
)
def projects_list(request):
    projects_list = Project.objects.all()
    categories = Category.objects.all()
    return render(
        request,
        "pages/project/projects_list.html",
        {"categories": categories, "projects_list": projects_list},
    )


@home_router.get(
    url_name="project_detail",
    url_path="projects/<slug:slug>/",
)
def project_detail(request, slug):
    project = get_object_or_404(Project, slug=slug)
    return render(request, "pages/project/detail.html", {"project": project})
