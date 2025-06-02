from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.schemas.blog import BlogPost, BlogOutput, BlogCreate, BlogUpdate
from datetime import date
from app.db import get_db
from app.dependencies.auth import get_current_admin
from app.models.blog import Blog

router = APIRouter(prefix="/blog", tags=["Blog"])

@router.get("/", response_model=list[BlogOutput])
def get_blog_list(db: Session = Depends(get_db)):
    return db.query(Blog).order_by(Blog.published_at.desc()).all()

@router.get("/{slug}", response_model=BlogOutput)
def get_blog(slug: str, db: Session = Depends(get_db)):
    blog = db.query(Blog).filter(Blog.slug == slug).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@router.post('/', response_model=BlogOutput, status_code=status.HTTP_201_CREATED)
def create_blog(post: BlogCreate, db: Session = Depends(get_db), _admin: dict = Depends(get_current_admin)):
    new_blog = Blog(
        slug=post.slug,
        title=post.title,
        summary=post.summary,
        content=post.content,
        published_at=post.published_at
    )
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)

    return new_blog

@router.put('/{slug}', response_model=BlogOutput, status_code=status.HTTP_200_OK)
def update_blog(slug: str, updated: BlogUpdate, db: Session = Depends(get_db), _admin: dict = Depends(get_current_admin)):
    blog = db.query(Blog).filter(Blog.slug == slug).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    blog.slug = updated.slug
    blog.title = updated.title
    blog.summary = updated.summary
    blog.content = updated.content
    blog.published_at = updated.published_at

    db.commit()
    db.refresh(blog)
    return blog

@router.delete('/{slug}', status_code=status.HTTP_204_NO_CONTENT)
def delete_blog(slug: str, db: Session = Depends(get_db), _admin: dict = Depends(get_current_admin)):
    blog = db.query(Blog).filter(Blog.slug == slug).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    db.delete(blog)
    db.commit()
    return {"detail": "Blog deleted successfully"}