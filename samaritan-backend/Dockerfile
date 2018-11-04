FROM python:3.6.6-slim-stretch

RUN mkdir /app
COPY ./requirments.txt /app/
COPY ./ /app/
WORKDIR /app
RUN pip install -r ./requirments.txt

ENV FLASK_APP=/app/samaritan
ENV FLASK_ENV=development

CMD ["flask", "run", "--host=0.0.0.0"]
