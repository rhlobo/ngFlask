import random
import string


def _random_string(length):
	chars = string.ascii_lowercase + string.digits
	return ''.join(random.choice(chars) for _ in range(length))


# FLASK
DEBUG = True
HOST = '0.0.0.0'
SECRET_KEY = _random_string(18)

# FLASK-SQLALCHEMY (DB)
SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'