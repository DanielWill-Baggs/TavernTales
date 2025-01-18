# Network level imports
import os
from dotenv import load_dotenv
import logging

# Load environment variables from .env file
load_dotenv()

# Groq API key
groq_api_key = os.getenv("GROQ_API_KEY")

logging.basicConfig(level=logging.INFO)

def get_env_variable(key: str, default=None):
    value = os.getenv(key, default)
    if value is None:
        raise ValueError(f"Environment variable {key} is not set.")
    return value