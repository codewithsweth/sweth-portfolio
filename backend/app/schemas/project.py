from pydantic import BaseModel, field_validator, Field
from typing import List

class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: str
    tech_stack: List[str]
    github_url: str
    live_url: str | None = None

    @field_validator("tech_stack", mode="before")
    @classmethod
    def split_tech_stack(cls, v):
        if isinstance(v, str):
            return [tech.strip() for tech in v.split(',')]
        return v


class ProjectOut(ProjectCreate):
    id: int

    class Config:
        from_attributes = True