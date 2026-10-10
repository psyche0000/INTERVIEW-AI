"""add users email index

Revision ID: 04fa2a8d46fa
Revises: 97068937185b
Create Date: 2026-10-10 08:00:13.832469

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '04fa2a8d46fa'
down_revision: Union[str, Sequence[str], None] = '97068937185b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
