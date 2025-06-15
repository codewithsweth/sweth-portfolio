from pydantic import BaseModel, Field, HttpUrl
from typing import List
from datetime import datetime

class SkillItem(BaseModel):
    skill: str
    proficiency: int = Field(..., ge=0, le=100)
    order: int | None = None

class SkillCategory(BaseModel):
    category: str
    skills: List[SkillItem]

class LanguageItem(BaseModel):
    language: str
    proficiency: int = Field(..., ge=0, le=100)
    order: int | None = None

class ExperienceItem(BaseModel):
    company: str
    role: str
    period: str
    description: str | None = None
    order: int | None = None

class SocialLink(BaseModel):
    platform: str
    url: str

class UpdateEntry(BaseModel):
    section: str
    timestamp: str

class BioUpdate(BaseModel):
    full_name: str
    title: str
    bio: str

class AvatarUpdate(BaseModel):
    avatar_url: HttpUrl

class SkillsUpdate(BaseModel):
    skills: List[SkillCategory]

class LanguagesUpdate(BaseModel):
    languages: List[LanguageItem]

class ExperienceUpdate(BaseModel):
    experience: List[ExperienceItem]

class SocialLinksUpdate(BaseModel):
    social_links: List[SocialLink]

class ProfileUpdateFull(BaseModel):
    full_name: str | None = None
    title: str | None = None
    bio: str | None = None
    avatar_url: HttpUrl | None = None
    social_links: List[SocialLink] | None = None
    skills: List[SkillCategory] | None = None
    languages: List[LanguageItem] | None = None
    experience: List[ExperienceItem] | None = None

class ProfileOut(BaseModel):
    id: int
    full_name: str | None = None
    title: str | None = None
    bio: str | None = None
    avatar_url: HttpUrl | None = None

    social_links: List[SocialLink] | None = None
    skills: List[SkillCategory] | None = None
    languages: List[LanguageItem] | None = None
    experience: List[ExperienceItem] | None = None
    update_history: List[UpdateEntry] | None = None

    created_at: datetime | None = None
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
