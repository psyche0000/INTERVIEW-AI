# Import the database connection function with a non-test name.
from app.db.session import test_db_connection as check_database_connection


# Verify that PostgreSQL is reachable.
def test_database_connection():
    # Assert that the database connection succeeds.
    assert check_database_connection() is True