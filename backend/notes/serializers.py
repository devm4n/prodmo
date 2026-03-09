from rest_framework import serializers

from .models import Notes


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = [
            "id",
            "title",
            "content",
            "is_public",
            "auth",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "auth", "created_at", "updated_at"]

    def create(self, validated_data):
        notes = Notes.objects.create(
            auth=self.context["request"].user,
            **validated_data,
        )

        return notes

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty")
        if len(value) > 200:
            raise serializers.ValidationError("Title too long")
        return value.strip()  # sanitization — removes extra spaces

    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError("Content cannot be empty")
        return value.strip()
