# Frappy

Frappy is a monolithic web app for managing a generic coffee shop catered towards millenials.  

## Grader Map

| Milestone | Location(s) |
| :--- | ---: |
| Milestone 1 | [Documentation](docs/ ) |

## Build Instructions

### Installation Requirements

```version
python3 >=3.10
node    >=16.17
```

### Linux

If running a *nix system, use the provided `build.sh` script.

### Windows

On windows, run the included `build.pwsh` script.

The script will automatically pull any needed dependencies or smaller packages.
Each script may prompt you for the required passwords or user accounts.

In the future, this will be migrated over to a docker compose file to allow for a single command build.

## Table of Contents

[Documentation](docs/ ) - Contains the project documentaiton and references.

[Source](src/) - Project Code

## Version Control

Version control will take place through github using git.  New features / bugs will be addressed as issues, which will then be assigned out.  Completed features and bug fixes will be submitted though forks relating to the specific issues referenced.

## Stack overview

For our project, we will be using a custom stack consisting of React, Django, and Postgres (RPD)

This can be expanded during production to a NGINX, Gunicorn, Django host.

- Django - Provides the REST API, user authentication, and serves static files via a reverse proxy with NGINX.
- React - Provides a front end framwork for building web and mobile applications, and allows us to fetch page specific javascript allowing for a simple to use SPA.
- Postgres - A free to use robust relational database.

## Testing

Testing is performed using JEST and pytest and can be run using

```powershell python runtests.py```

```npm run test```
