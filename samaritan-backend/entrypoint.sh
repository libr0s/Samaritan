exec uwsgi --http 0.0.0.0:5000 \
               --plugins python3 \
               --protocol uwsgi \
               --wsgi samaritan:app \
               --chdir /app