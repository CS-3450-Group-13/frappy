# Step 1: Setup docker

docker build -t frappe_server ./
docker run -d --name frappe -p 5432:5432/tcp frappe_server
docker container start frappe

Write-Output "Waiting on server start..."
Start-Sleep -Seconds 1.5
# Step 2: have python load in the data
Set-Location frappy
..\.venv\Scripts\python.exe manage.py migrate
..\.venv\Scripts\python.exe manage.py loaddata all