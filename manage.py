#!/usr/bin/env python


import sys
import flask.ext.migrate
import flask.ext.script

import server.config.env as env
import server.app as server


instance = server.flask_instance
manager = flask.ext.script.Manager(instance)
manager.add_command('db', flask.ext.migrate.MigrateCommand)


@manager.command
def run():
	mode = env.settings('ENVIRONMENT')
	if not mode:
		print 'Environment not defined correctly.'
		sys.exit(1)

	print 'Running in %s mode' % mode
	server.flask_instance.run()


# TODO: create function to start staging env
# TODO: create function to start production env
# TODO: create function to prepare deploy for production
# TODO: create function to prepare docker image
# TODO: create function to commit docker image
# TODO: create function to deploy on aws
# TODO: create function to deploy on heroku
# TODO: create function to reset db
# TODO: create function to init db
# TODO: create function to migrate db
# TODO: create function to populate db
# TODO: create function to run tests locally
# TODO: create function to run tests using staging


if __name__ == '__main__':
	manager.run()