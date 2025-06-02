from pydantic import BaseModel
from datetime import datetime

class BlogPost(BaseModel):
    slug: str
    title: str
    summary: str | None = None
    content: str
    published: bool = False
   

class BlogCreate(BlogPost):
    pass

class BlogUpdate(BlogPost):
    pass

class BlogOutput(BlogPost):
    id: int
    published_at: datetime | None = None

    class Config:
        orm_mode = True