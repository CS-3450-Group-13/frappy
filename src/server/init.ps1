# Step 1: Setup docker

Start-Process docker -ArgumentList 'build -t frappe_server ./'
Start-Process docker -ArgumentList 'run -d --name frappe -p 5432:5432/tcp frappe_server'

Start-Sleep -Seconds 1.5
# Step 2: have python load in the data
Set-Location frappy
Start-Process '..\.venv\Scripts\python.exe' -ArgumentList 'manage.py migrate --fake-initial'
Start-Process '..\.venv\Scripts\python.exe' -ArgumentList 'manage.py migrate --fake'
Start-Sleep -Seconds 1.5
Start-Process '..\.venv\Scripts\python.exe' -ArgumentList 'manage.py loaddata all'