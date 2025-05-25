from sqlalchemy import Column, Integer, String, Text
from app.db import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    tech_stack = Column(String(300))
    github_url = Column(String(300))
    live_url = Column(String(300), nullable=True)