"""add users email index

Revision ID: b1828c6f27b4
Revises: 04fa2a8d46fa
Create Date: 2026-10-10 08:01:16.218768

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b1828c6f27b4'
down_revision: Union[str, Sequence[str], None] = '04fa2a8d46fa'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None



def upgrade() -> None:
    op.create_index(
        "ix_users_email",
        "users",
        ["email"],
        unique=True,
    )


def downgrade() -> None:
    op.drop_index("ix_users_email", table_name="users")
