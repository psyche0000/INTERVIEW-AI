# Import SQLAlchemy's declarative base generator.
from sqlalchemy.orm import DeclarativeBase


# Define the shared base class for every SQLAlchemy model.
class Base(DeclarativeBase):
    # Keep the base class available for application models.
    pass


# Import all models after Base is defined.
# These imports register models with Base.metadata for Alembic.
from app import models  # noqa: E402, F401