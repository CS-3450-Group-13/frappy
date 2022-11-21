CREATE USER django_frappe with password 'insecure';
ALTER USER django_frappe CREATEDB;
alter role django_frappe
set client_encoding to 'utf8';
alter role django_frappe
SET default_transaction_isolation TO 'read committed';
ALTER ROLE django_frappe
SET timezone TO 'UTC';
ALTER DATABASE frabbe OWNER TO django_frappe;
GRANT ALL PRIVILEGES ON DATABASE frabbe TO django_frappe;
-- Quick Fix
GRANT ALL ON ALL TABLES IN SCHEMA public to django_frappe;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public to django_frappe;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public to django_frappe;