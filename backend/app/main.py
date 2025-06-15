from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import ALLOWED_ORIGINS
from app.routes import ping, projects, public_blog, admin_blog, contact, auth
from app.routes.profile import public_router, admin_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ping.router)
app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(contact.router)
app.include_router(public_blog.router)
app.include_router(admin_blog.router)
app.include_router(public_router)
app.include_router(admin_router)