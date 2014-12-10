import os


_value = os.getenv('APP_ENV', 'DEVELOPMENT')
_settings = {
	'PRODUCTION': {
		'ENVIRONMENT': 'Production',
		'FLASK_STATIC_FOLDER': '../client/bin',
		'FLASK_TEMPLATE_FOLDER': '../client/bin',
		'FLASK_CONFIG_OBJECT': 'server.config.flask_production'
	},
	'STAGING': {
		'ENVIRONMENT': 'Staing',
		'FLASK_STATIC_FOLDER': '../client/bin',
		'FLASK_TEMPLATE_FOLDER': '../client/bin',
		'FLASK_CONFIG_OBJECT': 'server.config.flask_production'
	},
	'DEVELOPMENT': {
		'ENVIRONMENT': 'Development',
		'FLASK_STATIC_FOLDER': '../client/build',
		'FLASK_TEMPLATE_FOLDER': '../client/build',
		'FLASK_CONFIG_OBJECT': 'server.config.flask_development'
	},
	'TESTING': {
		'ENVIRONMENT': 'Testing',
		'FLASK_STATIC_FOLDER': '../client/build',
		'FLASK_TEMPLATE_FOLDER': '../client/build',
		'FLASK_CONFIG_OBJECT': 'server.config.flask_testing'
	}
}

def settings(key):
	d = _settings.get(_value)
	return d.get(key) if d else None
