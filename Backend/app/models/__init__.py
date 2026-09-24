# Central model registration module.
#
# Member 1 and Member 2 models will be imported here
# once their finalized database models are available.
#
# Keeping all model imports centralized allows Alembic
# to discover every SQLAlchemy model through Base.metadata.

# Central model registration module.

# Register the Feedback model.
from app.models.feedback import Feedback

# Register the Conversation model.
from app.models.conversation import Conversation

# Register the Message model.
from app.models.message import Message

# Register the Notification model.
from app.models.notification import Notification