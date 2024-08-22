import click
from api.models import db, User

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):

    @app.cli.command("insert-users")
    def insert_users_data():
        users = [
            {
                "name": "John Doe",
                "email": "john@example.com",
                "password": "$2y$10$ILsnuwcNhB9oMo4/BFKiiukjcjuvliXE4WSEfe3x2SwpdFAL3HP9q",                
            },
            {
                "name": "Jane Smith",
                "email": "jane@example.com",
                "password": "$2y$10$d1NSFyZ0T6nh6SfAvf51YuQWDY0Pge41.GbZGZYbmuqB0j4KQUZ4u",                
            },
            {
                "name": "Michael Johnson",
                "email": "michael@example.com",
                "password": "$2y$10$40E/wNQ1atMEyOYgyNQ1IOLcRIaTS4kpJ7wauKPD7/Yk0NH8F1OKK",                
            },
            
        ]

        for user in users:
            new_user = User()
            new_user.name = user["name"]
            new_user.email = user["email"]
            new_user.password = user["password"]            
            db.session.add(new_user)
            db.session.commit()
            print("user: ", new_user.name, " created.")