from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from notes.views import AdminNotesListView, NotesCreateView, NotesDetailView
from users.views import AdminUserCreate, UserCreateView, UserProfileView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/signup/", UserCreateView.as_view(), name="user_create"),
    path("api/v1/auth/signin/", TokenObtainPairView.as_view(), name="obtain_token"),
    path("api/v1/auth/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api/v1/user/profile/", UserProfileView.as_view(), name="user_data"),
    path("api/v1/auth/admin-create/", AdminUserCreate.as_view(), name="admin_crate"),
    path("api/v1/admin/notes/", AdminNotesListView.as_view(), name="admin_list_view"),
    path("api/v1/notes/", NotesCreateView.as_view(), name="notes_create_list"),
    path(
        "api/v1/notes/<int:pk>/",
        NotesDetailView.as_view(),
        name="notes_detailed_list",
    ),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger"
    ),
]
