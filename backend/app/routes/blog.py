from fastapi import APIRouter, HTTPException
from app.schemas.blog import BlogPost
from datetime import date

router = APIRouter(prefix="/blog", tags=["Blog"])

blog_posts = [
    BlogPost(
        slug="launching-devport",
        title="Launching DevPort",
        summary="A look into building and launching my portfolio platform.",
        content="This is the full content of the DevPort launch post.",
        published_at=date(2024, 12, 1)
    ),
    BlogPost(
        slug="why-i-chose-fastapi",
        title="Why I Chose FastAPI for My Backend",
        summary="My reasoning for using FastAPI in my fullstack portfolio site.",
        content="Here's why FastAPI was the best fit for my backend...",
        published_at=date(2024, 12, 10)
    )
]

@router.get("/", response_model=list[BlogPost])
def get_blog_list():
    return blog_posts

@router.get("/{slug}", response_model=BlogPost)
def get_blog_post(slug: str):
    for post in blog_posts:
        if post.slug == slug:
            return post
    raise HTTPException(status_code=404, detail="Post not found")