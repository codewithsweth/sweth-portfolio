from app.db import Base
from sqlalchemy import Column, Integer, String, Text, JSON, DateTime, func

class Profile(Base):
    __tablename__ = "profile"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=True)
    title = Column(String(100), nullable=True)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String(255), nullable=True)

    social_links = Column(JSON, nullable=True)
    skills = Column(JSON, nullable=True)
    languages = Column(JSON, nullable=True)
    experience = Column(JSON, nullable=True)

    update_history = Column(JSON, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

