# Demos

Contained in this directory are a few of the high level demos for features of our product.

Currently this contains a simple interactive API where users can submit drinks and ingredients to the database.

## API Demo

### Run demos

The following packages are required to run the demo project

```txt
django
djangorestframework
```

These can be easily installed by running `pip install django djangorestframework` in your desired python environment. I recommend creating a small virtual environment "venv" to download and run these scripts in by running `python -m venv .venv`, and then running `./.venv/Scripts/activate.ps1`.

Once these pachages are installed, head over to [Frabbe](frabbe\frabbe) and run the following commands to build and start the server

```bash
py manage.py migrate
py manage.py runserver
```

You may also need to create a test user for your demo by running `py manage.py createsuperuser` command.
