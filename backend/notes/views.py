from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from .models import Notes
from .serializers import NotesSerializer


class NotesCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotesSerializer

    def get_queryset(self):
        return Notes.objects.filter(auth=self.request.user)


class NotesDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = NotesSerializer

    def get_queryset(self):
        return Notes.objects.filter(auth=self.request.user)


class AdminNotesListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = NotesSerializer
    queryset = Notes.objects.all().select_related("auth")
