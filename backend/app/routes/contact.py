from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.schemas.contact import ContactMessage
from app.utils.email import render_email_template, send_email

router = APIRouter(prefix="/contact", tags=["Contact"])

class SubscribeRequest(BaseModel):
    email: EmailStr

@router.post("/")
def send_message(contact: ContactMessage):
    print(f"New contact from <{contact.email}>: {contact.message}")
    return {"message": 'Message received!, Thank you!'}

@router.post("/subscribe")
async def subscribe(request: SubscribeRequest):
    html = render_email_template("email_welcome.html", {})
    status, data = await send_email(
        to_email=request.email,
        subject="Thanks for subscribing!",
        html_content=html,
    )

    if status != 200:
        raise HTTPException(status_code=500, detail="Failed to send email")
    
    return {"message": "Subscription successful!"}
