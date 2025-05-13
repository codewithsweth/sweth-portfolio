from dotenv import load_dotenv
import os

load_dotenv()
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000')
PORT = int(os.getenv("PORT", 8000))