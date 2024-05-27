from django import template

register = template.Library()


@register.filter(name="strip_alert")
def strip_alert(value):
    return value.replace("alert-", "")
