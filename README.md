# MusiX Web Application

Welcome to the MusiX web application repository! MusiX is a user-friendly web app that allows you to manage your music library, add artists and tracks.

This was created as a project assignment for the year 3, second semester subject "Data Transmission" at the Technical University of Cluj-Napoca in 2023.

## Technologies Used

The MusiX web application is built using the following technologies:

- Frontend: Angular
- Backend: NestJS
- Database: MariaDB

## Prerequisites

Before getting started, make sure you have the following installed on your machine:

- Node.js
- Angular CLI
- NestJS CLI
- Docker

## Getting Started

To run the MusiX web application on your local machine, follow these steps:

1. Clone this repository to your local machine using the following command:
```sh
git clone git@github.com:iRealWorlds/musix.git
```
2. Navigate to the project's directory:
```sh
cd musix
```
3. Copy the `.env.example` file to `.env` and fill it in with your information.
4. Start up the application in development mode
```sh
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build -d
```
5. Run database migrations in the API project:
```sh
cd api && npm run typeorm:run-migrations
```
> **Note!** The application should still be running when you run migrations.
6. The application should now be running.
* Frontend: http://127.0.0.1:4200
* Backend: http://127.0.0.1:3000
* OpenAPI documentation: http://127.0.0.1:3000/api
7. (optional) While this is not required to run the application, you should also install NPM dependencies locally for development.


## Contributing

We welcome contributions to the MusiX web application! If you'd like to contribute, please follow these steps:

1. Fork this repository to your own GitHub account.

2. Create a new branch with a descriptive name for your feature or bug fix.

3. Make your changes, commit them, and push them to your forked repository.

4. Submit a pull request, detailing the changes you made and any relevant information.

## Contact

If you have any questions or suggestions regarding the MusiX web application, please feel free to contact us at [calin.marin@codestage.ro](mailto:calin.marin@codestage.ro).

We hope you enjoy using MusiX to manage your music library and have a great experience exploring and sharing your favorite artists and tracks!
