FROM postgres
ENV POSTGRES_PASSWORD "insecure"
ENV POSTGRES_DB frabbe
COPY 01-init.sql/ /docker-entrypoint-initdb.d/
