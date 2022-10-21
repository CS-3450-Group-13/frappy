# Django webserver usage and requirements

## Notes

As this is a development environemnt, you'll notice a few small changes that will not be seen in production.

- Emails are printed to stdout of our server, rather than sent to the client.  For production, please configure your own smtp server.
- Our database relies on a postgresql server running on the system.  I suggest configuring a docker container running postgres and matching its configuration with that found in `frappy/settings.py`

## Developer / Maintainer Notes

All login endpoints mirror those found at [dj-rest-auth](https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html), just substitupe `/dj-rest-auth/` with `/auth-endpoint/`

## Running the Django development server

So you wanna run the server backend huh? Well it takes just about as much as a full deployment to set up. This guide should help you account for all of the steps needed.

### Step 1: Install required packages

You may want to configure a `.venv` for your python intepreter before running this step, but go ahead and run

```bash
pip install -r src/server/requirements.txt
```

This should install django, django rest, pillow, and any other packages used for the framework.

## Step 2: Build and run the docker image provided

## 2.1

To build a local copy of the database you can run, navigate to the `./server` folder and run

```shell
docker build -t frappy-db ./
```

## 2.2

Then, open the docker desktop app and spin up a new instance of the frappy-db image.
> Make sure you also specify the port to forward when creaing the container, you should use `5432`
