import datetime

from server.app import db, api_manager


def _get_date():
    return datetime.datetime.now()


class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime, default=_get_date, nullable=False)
    description = db.Column(db.Unicode, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    comment = db.Column(db.Unicode)


api_manager.create_api(Expense, methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], results_per_page=-1);