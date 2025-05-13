from pydantic import BaseModel
from typing import List

class Project(BaseModel):
    id: int
    title: str
    description: str
    tech_stack: List[str]
    github_url: str
    live_url: str | None = None
    