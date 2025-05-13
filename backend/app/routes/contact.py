from fastapi import APIRouter
from app.schemas.contact import ContactMessage

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("/")
def send_message(contact: ContactMessage):
    print(f"New contact from <{contact.email}>: {contact.message}")
    return {"message": 'Message received!, Thank you!'}