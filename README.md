# Angular-Flask Boilerplate

Both client and server apps are contained in this repository, kept in sync. 
They integrate through a RESTful api. 


#### TODOs

## Clean angular client
- Clean html
- Clean project files

## Python flask server
- Create simple python application
- Have an environment variable define the environment (PRODUCTION / STAGING / DEVELOPMENT / TESTING)
- Point flask static_folder and template_folder to client files (build / bin)

## Data
- RESTful API
- Data persistence of REST calls

## Documentation
- Clean up the ngbp README
- Document flask application

## Manage
- Create a manage.py script with commands:
    - Run server / client in development mode
    - Prepare the database
    - Create test data
    - Create inittial data
    - Reset the database
    - CRUD on databse
    - Backup data?
- Create api access script

## Infrastructure
- Create an Docker container serving the app
- Create an Nging / uWSGI container serving the app
- Configure Nginx to cache static files
- Leave load balancing ready
- Try to solve "distributed session" (session in DB, long lasting lb redirection)
