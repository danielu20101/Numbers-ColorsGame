FROM python:3

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install Flask flask_cors redis

WORKDIR /code
COPY . /code/