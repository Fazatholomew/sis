from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand

from application.app import app, db

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command("runserver", Server(host="0.0.0.0", port=8080))

# migrations
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()


if __name__ == '__main__':
    manager.run()
