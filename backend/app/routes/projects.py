from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas.project import ProjectCreate, ProjectOut
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.project import Project
from app.dependencies.auth import get_current_admin

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("/", response_model=list[ProjectOut])
def get_all_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.id.desc()).all()

@router.get("/{project_id}", response_model=ProjectOut)
def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=401, detail="Project not found")
    return project

@router.post("/", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectCreate, db: Session = Depends(get_db), _: dict = Depends(get_current_admin)):
    new_project = Project(
        title=project.title,
        description=project.description,
        tech_stack=",".join(project.tech_stack),
        github_url=project.github_url,
        live_url=project.live_url,
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.delete('/{project_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db), _: dict = Depends(get_current_admin)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return


@router.put('/{project_id}', response_model=ProjectOut)
def update_project(project_id: int, updated: ProjectCreate, db: Session = Depends(get_db), _: dict = Depends(get_current_admin)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project.title = updated.title
    project.description = updated.description
    project.tech_stack = ','.join(updated.tech_stack)
    project.github_url = updated.github_url
    project.live_url = updated.live_url

    db.commit()
    db.refresh(project)
    return project