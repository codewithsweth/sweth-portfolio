from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from app.db import Base

class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(200), unique=True, nullable=False)
    title = Column(String(200), nullable=False)
    summary = Column(Text)
    content = Column(Text)
    published = Column(Boolean, default=False)
    published_at = Column(DateTime, nullable=True)