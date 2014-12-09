from server.app import db, api_manager


class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)
    birth_date = db.Column(db.Date)


blueprint = api_manager.create_api(Person, methods=['GET', 'POST', 'DELETE'])