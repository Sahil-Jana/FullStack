from django.contrib import admin
from .models import Video, Like, WatchLater, Comment

admin.site.register(Video)
admin.site.register(Like)
admin.site.register(WatchLater)
admin.site.register(Comment)
