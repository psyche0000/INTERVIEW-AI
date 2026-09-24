# Import Python system utilities for resolving the project root.
import sys
from pathlib import Path

# Add the backend project root to Python's module search path.
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

# Import Alembic context for migration configuration.
from logging.config import fileConfig

# Import SQLAlchemy migration utilities.
from sqlalchemy import engine_from_config
from sqlalchemy import pool

# Import Alembic configuration.
from alembic import context

# Import application settings.
from app.core.config import settings

# Import the shared SQLAlchemy Base.
from app.db.base import Base


# Load Alembic configuration.
config = context.config


# Configure Python logging only when logging sections exist in alembic.ini.
if config.config_file_name is not None:
    # Skip logging configuration because our alembic.ini has no logging sections yet.
    pass


# Set the SQLAlchemy metadata used by Alembic autogenerate.
target_metadata = Base.metadata


# Store the database URL from application settings.
database_url = settings.DATABASE_URL


# Do not place the database URL into Alembic's ConfigParser.
# The database URL is passed directly to the SQLAlchemy engine configuration.


# Run migrations without an active database connection.
def run_migrations_offline() -> None:
    # Configure Alembic for offline SQL generation.
    context.configure(
        url=database_url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    # Begin the migration transaction.
    with context.begin_transaction():
        # Run the migration operations.
        context.run_migrations()


# Run migrations using an active database connection.
def run_migrations_online() -> None:
    # Create the SQLAlchemy engine directly from the application database URL.
    connectable = engine_from_config(
        {"sqlalchemy.url": database_url},
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    # Open a database connection.
    with connectable.connect() as connection:
        # Configure Alembic with the active database connection.
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        # Begin the migration transaction.
        with context.begin_transaction():
            # Run the migration operations.
            context.run_migrations()

# Select the appropriate migration mode.
if context.is_offline_mode():
    # Run migrations without connecting to PostgreSQL.
    run_migrations_offline()
else:
    # Run migrations using PostgreSQL.
    run_migrations_online()