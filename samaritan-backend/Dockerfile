FROM python:3.6.6-slim-stretch

RUN apt-get update && apt-get -y install build-essential

RUN mkdir /app
COPY ./requirments.txt /app/
COPY ./ /app/
COPY ./entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh
WORKDIR /app
RUN pip install -r ./requirments.txt

ENV FLASK_APP=/app/samaritan\
    FLASK_ENV=development\
    MONGO_URI=mongodb://mongo:27017/cache_actions\
    BROKER_URI=redis://redis:6379

ENTRYPOINT ["sh", "/usr/bin/entrypoint.sh"]
