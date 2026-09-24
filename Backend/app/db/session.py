# Import SQLAlchemy components for database management.
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Import centralized application settings.
from app.core.config import settings


# Create the SQLAlchemy database engine.
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
)


# Create a reusable database session factory.
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


# Provide a database session for FastAPI dependencies.
def get_db():
    # Create a new database session.
    db = SessionLocal()

    try:
        # Provide the active database session.
        yield db
    finally:
        # Always close the database session.
        db.close()


# Test the PostgreSQL database connection.
def test_db_connection() -> bool:
    # Open a temporary database connection.
    with engine.connect() as connection:
        # Execute a simple PostgreSQL query.
        result = connection.execute(text("SELECT 1"))

        # Confirm PostgreSQL responded successfully.
        return result.scalar() == 1