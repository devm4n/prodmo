from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import UserCreateSerializer, UserProfileSerializer


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserCreateSerializer


class UserProfileView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)


class AdminUserCreate(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = UserCreateSerializer

    def perform_create(self, serializer):
        serializer.save(is_staff=True, is_superuser=True)
