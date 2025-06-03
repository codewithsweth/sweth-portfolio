from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.blog import BlogOutput
from app.db import get_db
from app.dependencies.auth import get_current_admin
from app.models.blog import Blog

router = APIRouter(prefix="/blog", tags=["Blog"])

@router.get("/", response_model=list[BlogOutput])
def get_blog_list(db: Session = Depends(get_db)):
    return db.query(Blog).filter(Blog.published == True).order_by(Blog.published_at.desc()).all()

@router.get("/{slug}", response_model=BlogOutput)
def get_blog(slug: str, db: Session = Depends(get_db)):
    blog = db.query(Blog).filter(Blog.published == True).filter(Blog.slug == slug).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog