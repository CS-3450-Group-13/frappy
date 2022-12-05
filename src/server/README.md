# Django webserver usage and requirements

## Notes

As this is a development environemnt, you'll notice a few small changes that will not be seen in production.

- Emails are printed to stdout of our server, rather than sent to the client.  For production, please configure your own smtp server.
- Our database relies on a postgresql server running on the system.  I suggest configuring a docker container running postgres and matching its configuration with that found in `frappy/settings.py`

## Developer / Maintainer Notes

All login endpoints mirror those found at [dj-rest-auth](https://dj-rest-auth.readthedocs.io/en/latest/api_endpoints.html), just substitupe `/dj-rest-auth/` with `/auth-endpoint/`

## Running the Django development server

So you wanna run the server backend huh? Well it takes just about as much as a full deployment to set up. This guide should help you account for all of the steps needed.

> Note: The following commands are only needed for a manual install, most windows users should be able to get away with using the `init.ps1` script found in this section.
>
### Step 1: Install required packages

You may want to configure a `.venv` (in fact its required).  To build a python interpreter that your process can use, run the following.

```python
~ /src/server
python -m venv .venv
```

 After you've sucessfully created a virtual environment, activate the environment and install the required packages using the commands below.

```bash
~ /src/server
.venv\Scripts\activate

~ /src/server
pip install -r requirements.txt
```

This should install django, django rest, pillow, and any other packages used for the framework.

## Step 2: Build and run the docker image provided

## 2.1

To build a local copy of the database you can run, navigate to the `./server` folder and run.

```shell
./init.ps1
```

This script will load all the required docker containers and testing data into our server.

This script currently only supports running commands on windows, however running the commands inside by hand will also work, ignoring those PS specific commands.
