# Running the Django development server

So you wanna run the server backend huh? Well it takes just about as much as a full deployment to set up.  This guide should help you account for all of the steps needed.

## Step 1: Install required packages

You may want to configure a `.venv` for your python intepreter before running this step, but go ahead and run
```bash
pip install -r src/server/requirements.txt
```

This should install django, django rest, pillow, and any other packages used for the framework.

## Step 2: Install or create a Postgres instance

Using either docker or just your computer, go ahead and set up a postgres server that you have access to.  

Just go ahead and follow this guide at[Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-20-0)

## Step 3: Load the migrations and data

In order to actually configure your database, you need to run the following commands

```python
py manage.py makemigrations
py manage.py loaddata ingredients
```

This will construct the required tables and load them with some pregenerated data from the milks file

## Step 4: Struggle

If its not working at this point then your guess is as good as mine, hopefully stack overflow can help you with the steps I forgot / you didn't follow.

