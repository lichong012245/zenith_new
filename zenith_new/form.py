# coding: utf-8

from django import forms
from django.core.exceptions import ValidationError
import re

def validate_phonenumber(value):
    p = re.compile('(?:(?:(\s*\(?([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2‌​-9][02-8]1|[2-9][02-8][02-9]))\)?\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9]‌​[02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})')
    if not p.match(value):
        raise ValidationError(u'%s is not a valid phone number' % value)

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100,widget=forms.TextInput(attrs={'tabindex':'4','id':'name','name':'name','type':'text','value':'','class':'span12','placeholder':'Name: ...'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'tabindex':'2','id':'email','name':'email','type':'text','value':'','class':'span12','placeholder':'Email: ...'}))
    phone = forms.CharField(validators=[validate_phonenumber],widget=forms.TextInput(attrs={'tabindex':'3','id':'www','name':'www','type':'text','value':'','class':'span12','placeholder':'Phone: 123-234-3434'}))
    message = forms.CharField(widget=forms.Textarea(attrs={'tabindex':'3','id':'message','name':'body','rows':'7','class':'input-xlarge span12','placeholder':'Message: ...'}))