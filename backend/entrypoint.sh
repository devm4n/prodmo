#!/bin/bash

echo "migrations"
uv run python manage.py migrate users

echo "runserver"
uv run python manage.py runserver 0.0.0.0:8000
