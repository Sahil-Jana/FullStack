from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Video, Like, WatchLater, Comment
from .serializers import VideoSerializer, LikeSerializer, WatchLaterSerializer, CommentSerializer
from django.shortcuts import get_object_or_404

# Permission: Only allow authenticated users to create, like, comment, etc.
class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.method in permissions.SAFE_METHODS or
            request.user and request.user.is_authenticated
        )

# Video Upload and List
class VideoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Video.objects.all().order_by('-uploaded_at')
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)

# Video Detail (Retrieve)
class VideoDetailAPIView(generics.RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'

# Like Video
class LikeVideoAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, video_id):
        video = get_object_or_404(Video, id=video_id)
        like, created = Like.objects.get_or_create(user=request.user, video=video)
        if not created:
            return Response({'detail': 'Already liked'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Liked'}, status=status.HTTP_201_CREATED)

# Save to Watch Later
class SaveWatchLaterAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, video_id):
        video = get_object_or_404(Video, id=video_id)
        saved, created = WatchLater.objects.get_or_create(user=request.user, video=video)
        if not created:
            return Response({'detail': 'Already saved'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Saved to Watch Later'}, status=status.HTTP_201_CREATED)

# Add Comment
class AddCommentAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, video_id):
        video = get_object_or_404(Video, id=video_id)
        content = request.data.get('content')
        if not content:
            return Response({'error': 'Comment content is required'}, status=status.HTTP_400_BAD_REQUEST)
        comment = Comment.objects.create(user=request.user, video=video, content=content)
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# List Comments for a Video
class ListCommentsAPIView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        video_id = self.kwargs['video_id']
        return Comment.objects.filter(video__id=video_id).order_by('-timestamp')
