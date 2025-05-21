import httpx
import os
from jinja2 import Environment, FileSystemLoader


env = Environment(loader=FileSystemLoader("templates"))

def render_email_template(template_name: str, context: dict):
    template = env.get_template(template_name)
    return template.render(context)

async def send_email(to_email: str, subject: str, html_content: str):
    RESEND_API_KEY = os.getenv("RESEND_API_KEY")
    FROM_EMAIL = os.getenv("FROM_EMAIL")

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": FROM_EMAIL,
                "to": [to_email],
                "subject": subject,
                "html": html_content,
            }
        )
        return response.status_code, response.json()