
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.profile import Profile
from app.schemas.profile import ProfileOut, ProfileUpdateFull, BioUpdate, AvatarUpdate, SocialLinksUpdate, SkillsUpdate, LanguagesUpdate, ExperienceUpdate
from app.db import get_db
from app.dependencies.auth import get_current_admin

public_router = APIRouter(prefix="/profile", tags=["Profile"])
admin_router = APIRouter(prefix="/admin/profile", tags=["Admin Profile"])

# Fetch the singleton Profile or create it if missing
def get_or_create_profile(db: Session) -> Profile:
    profile = db.query(Profile).first()
    if not profile:
        profile = Profile()
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

# Public endpoint for homepage
@public_router.get('/', response_model=ProfileOut)
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(Profile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

# Admin endpoint for management
@admin_router.get('/', response_model=ProfileOut)
def get_admin_profile(db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    return get_or_create_profile(db)


# update full profile
@admin_router.put('/', response_model=ProfileOut)
def update_full_profile(payload: ProfileUpdateFull, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    profile = get_or_create_profile(db)
    data = payload.model_dump(exclude_unset=True)

    for field, value in data.items():
        setattr(profile, field, value)
    
    db.commit()
    db.refresh(profile)
    return profile


# update bio
@admin_router.put('/bio', response_model=ProfileOut)
def update_bio(payload: BioUpdate, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    profile = get_or_create_profile(db)
    data = payload.model_dump(exclude_unset=True)
    for field, value in data.items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)
    return profile

# update avatar
@admin_router.put('/avatar', response_model=ProfileOut)
def update_avatar(payload: AvatarUpdate, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    profile = get_or_create_profile(db)
    profile.avatar_url = str(payload.avatar_url)
    db.commit()
    db.refresh(profile)
    return profile


# update social links
@admin_router.put('/socials', response_model=ProfileOut)
def update_socials(payload: SocialLinksUpdate, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    profile = get_or_create_profile(db)
    profile.social_links = [link.model_dump() for link in payload.social_links]
    db.commit()
    db.refresh(profile)
    return profile

# update skills
@admin_router.put('/skills', response_model=ProfileOut)
def update_skills(payload: SkillsUpdate, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    profile = get_or_create_profile(db)
    profile.skills = [cat.model_dump() for cat in payload.skills]
    db.commit()
    db.refresh(profile)
    return profile

# update languages
@admin_router.put('/languages', response_model=ProfileOut)
def update_languages(payload: LanguagesUpdate, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    profile = get_or_create_profile(db)
    profile.languages = [lang.model_dump() for lang in payload.languages]
    db.commit()
    db.refresh(profile)
    return profile

# update experience
@admin_router.put('/experience', response_model=ProfileOut)
def update_experience(payload: ExperienceUpdate, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    profile = get_or_create_profile(db)
    profile.experience = [exp.model_dump() for exp in payload.experience]
    db.commit()
    db.refresh(profile)
    return profile