# Alembic migration template.

"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""

# Import Alembic migration operations.
from typing import Sequence, Union

# Import Alembic operation utilities.
from alembic import op

# Import SQLAlchemy types for migration definitions.
import sqlalchemy as sa


# Define the migration revision identifier.
revision: str = ${repr(up_revision)}

# Define the previous migration revision.
down_revision: Union[str, Sequence[str], None] = ${repr(down_revision)}

# Define optional branch labels.
branch_labels: Union[str, Sequence[str], None] = ${repr(branch_labels)}

# Define optional migration dependencies.
depends_on: Union[str, Sequence[str], None] = ${repr(depends_on)}


# Apply the migration changes.
def upgrade() -> None:
    ${upgrades if upgrades else "pass"}


# Reverse the migration changes.
def downgrade() -> None:
    ${downgrades if downgrades else "pass"}
    