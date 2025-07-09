from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Video, Like, WatchLater, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'timestamp']

class VideoSerializer(serializers.ModelSerializer):
    uploader = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Video
        fields = ['id', 'uploader', 'title', 'description', 'video_file', 'thumbnail', 'uploaded_at', 'comments']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'video', 'liked_at']

class WatchLaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchLater
        fields = ['id', 'user', 'video', 'saved_at']
