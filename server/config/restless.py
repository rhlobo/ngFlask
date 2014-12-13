import new
import types
import flask.ext.restless.manager as m
import flask.ext.restless.helpers as h
import flask.ext.restless.views as v


name = 'get'
cls = m.API


def _newget(self, *args, **kw):
    data = self._oldget(*args, **kw)[0]
    return data['objects'] if data.get('objects') else data


def jsonify(*args, **kw):
    response = v._jsonify(*args, **kw)
    if 'headers' in kw:
        v.set_headers(response, kw['headers'])
    return response


def configure():
    setattr(cls, '_oldget', cls.__dict__['get'])
    setattr(cls, 'get', _newget)
