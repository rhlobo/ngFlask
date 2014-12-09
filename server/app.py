import flask
import flask.ext.restless
import flask.ext.sqlalchemy
import flask.ext.migrate
import flask.ext.script


# TODO: Set static_folder
# TODO: The template_folder is environment dependent:
# DEVELOPMNET, CLIENT TESTING => client/build
# PRODUCTION, STAGING => client/bin
flask_instance = _flask = flask.Flask(__name__, template_folder='../client/bin')
flask_instance.config.from_object('server.config.settings')
flask_instance.config.from_envvar('APP_SETTINGS', silent=True)

db = flask.ext.sqlalchemy.SQLAlchemy(_flask)
db_migrate = flask.ext.migrate.Migrate(_flask, db, directory='config/migrations')
api_manager = flask.ext.restless.APIManager(_flask, flask_sqlalchemy_db=db)
script_manager = flask.ext.script.Manager(_flask)


# IMPORTS DOMAIN
from domain import *

# Create the database tables
db.create_all()


# TODO: Remove this to another place?
@_flask.route('/')
def root():
	return flask.render_template('index.html')
