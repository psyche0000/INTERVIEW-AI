# Import the SQLAlchemy metadata.
from app.db.base import Base


# Verify that all current Member 3 models are registered.
def test_models_are_registered():
    # Get all registered database table names.
    table_names = set(Base.metadata.tables.keys())

    # Define the expected Member 3 tables.
    expected_tables = {
        "feedback",
        "conversations",
        "messages",
        "notifications",
    }

    # Verify that every expected table is registered.
    assert expected_tables.issubset(table_names)