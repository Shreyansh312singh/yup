from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory

# Global store for chat histories
# helpers.py

# Assuming ChatMessageHistory is defined somewhere
# You may need to import it from another module, depending on where it's defined.
# For now, let's just assume it's a class.

# Initialize an empty dictionary for storing session history
store = {}

def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = ChatMessageHistory()  # Or your equivalent logic
    return store[session_id]

def flush():
    global store
    store = {}  # Clear the store
