from sqlalchemy import Column, Integer, String, Text, Date
from app.db import Base

class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(200), unique=True, nullable=False)
    title = Column(String(200), nullable=False)
    summary = Column(Text)
    content = Column(Text)
    published_at = Column(Date)