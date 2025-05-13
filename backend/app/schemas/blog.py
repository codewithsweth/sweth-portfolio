from pydantic import BaseModel
from datetime import date

class BlogPost(BaseModel):
    slug: str
    title: str
    summary: str
    content: str
    published_at: date