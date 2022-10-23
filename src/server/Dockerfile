FROM postgres
ENV POSTGRES_PASSWORD "insecure"
ENV POSTGRES_DB frabbe
COPY 02-frabbe.sql /docker-entrypoint-initdb.d/
COPY 01-init.sql/ /docker-entrypoint-initdb.d/