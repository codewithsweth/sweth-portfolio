from pydantic import BaseModel
from datetime import date

class BlogPost(BaseModel):
    slug: str
    title: str
    summary: str
    content: str
    published_at: date

class BlogCreate(BlogPost):
    pass

class BlogUpdate(BlogPost):
    pass

class BlogOutput(BlogPost):
    id: int

    class Config:
        orm_mode = True