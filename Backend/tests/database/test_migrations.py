# Import the Alembic configuration utilities.
from alembic.config import Config

# Import Alembic command utilities.
from alembic import command


# Verify that Alembic can read the migration configuration.
def test_alembic_configuration():
    # Load the project's Alembic configuration.
    config = Config("alembic.ini")

    # Verify that the Alembic script location is configured.
    assert config.get_main_option("script_location") == "alembic"


# Verify that Alembic can inspect the migration history.
def test_alembic_history():
    # Load the project's Alembic configuration.
    config = Config("alembic.ini")

    # Run the Alembic history command.
    command.history(config)