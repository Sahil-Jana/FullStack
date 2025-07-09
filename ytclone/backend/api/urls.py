from django.urls import path
from .views import (
    VideoListCreateAPIView,
    VideoDetailAPIView,
    LikeVideoAPIView,
    SaveWatchLaterAPIView,
    AddCommentAPIView,
    ListCommentsAPIView,
)

urlpatterns = [
    # Videos
    path('videos/', VideoListCreateAPIView.as_view(), name='video-list-create'),
    path('videos/<int:id>/', VideoDetailAPIView.as_view(), name='video-detail'),

    # Likes
    path('videos/<int:video_id>/like/', LikeVideoAPIView.as_view(), name='like-video'),

    # Watch Later
    path('videos/<int:video_id>/save/', SaveWatchLaterAPIView.as_view(), name='save-watch-later'),

    # Comments
    path('videos/<int:video_id>/comment/', AddCommentAPIView.as_view(), name='add-comment'),
    path('videos/<int:video_id>/comments/', ListCommentsAPIView.as_view(), name='list-comments'),
]
