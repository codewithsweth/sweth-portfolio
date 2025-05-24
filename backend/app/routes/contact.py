from fastapi import APIRouter, HTTPException
from app.schemas.contact import ContactMessage, SubscribeRequest
from app.utils.email import render_email_template, send_email
import os

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("/")
async def send_message(contact: ContactMessage):
    TO_EMAIL = os.getenv("MAIN_EMAIL")
    html = render_email_template("email_contact.html", {
        "name": contact.name,
        "email": contact.email,
        "message": contact.message
    })
    status, result = await send_email(
        to_email=TO_EMAIL,
        subject=f"Contact Form Message from {contact.name}",
        html_content=html
    )

    if status != 200:
        raise HTTPException(status_code=500, detail="Failed to send message")
    
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
