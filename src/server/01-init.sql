CREATE USER django_frappe with password 'insecure';
alter role django_frappe
set client_encoding to 'utf8';
alter role django_frappe
SET default_transaction_isolation TO 'read committed';
ALTER ROLE django_frappe
SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE frabbe TO django_frappe;