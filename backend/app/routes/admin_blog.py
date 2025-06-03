from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.schemas.blog import BlogOutput, BlogCreate, BlogUpdate
from app.db import get_db
from app.dependencies.auth import get_current_admin
from app.models.blog import Blog
from datetime import datetime

router = APIRouter(prefix="/admin/blogs", tags=["Blog"])

@router.get("/", response_model=list[BlogOutput])
def get_blog_list(db: Session = Depends(get_db), _admin: dict = Depends(get_current_admin)):
    return db.query(Blog).order_by(Blog.published_at.desc()).all()

@router.get("/{blog_id}", response_model=BlogOutput)
def get_blog(blog_id: int, db: Session = Depends(get_db), _admin: dict = Depends(get_current_admin)):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@router.post('/', response_model=BlogOutput, status_code=status.HTTP_201_CREATED)
def create_blog(post: BlogCreate, db: Session = Depends(get_db), _admin: dict = Depends(get_current_admin)):
    published_at = datetime.now() if post.published else None
    existing_blog = db.query(Blog).filter(Blog.slug == post.slug).first()
    if existing_blog:
        raise HTTPException(status_code=400, detail="Blog with this slug already exists")

    new_blog = Blog(**post.model_dump(), published_at=published_at)

    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)

    return new_blog

@router.put('/{blog_id}', response_model=BlogOutput, status_code=status.HTTP_200_OK)
def update_blog(blog_id: int, updated: BlogUpdate, db: Session = Depends(get_db), _admin: dict = Depends(get_current_admin)):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    for field ,value in updated.model_dump().items():
        setattr(blog, field, value)

    if updated.published and blog.published_at is None:
        blog.published_at = datetime.now()
    elif not updated.published:
        blog.published_at = None

    db.commit()
    db.refresh(blog)
    return blog

@router.delete('/{blog_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_blog(blog_id: int, db: Session = Depends(get_db), _admin: dict = Depends(get_current_admin)):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    db.delete(blog)
    db.commit()
    return {"detail": "Blog deleted successfully"}