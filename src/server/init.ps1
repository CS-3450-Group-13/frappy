# Step 1: Setup docker

docker build -t frappe_server ./
docker run -d --name frappe -p 5432:5432/tcp frappe_server

# Step 2: have python load in the data
Set-Location frappy
..\.venv\Scripts\python.exe manage.py migrate --fake-initial
..\.venv\Scripts\python.exe manage.py migrate --fake
..\.venv\Scripts\python.exe manage.py loaddata all