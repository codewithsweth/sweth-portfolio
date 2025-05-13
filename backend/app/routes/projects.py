from fastapi import APIRouter, HTTPException
from app.schemas.project import Project

router = APIRouter(prefix="/projects", tags=["Projects"])

# Temp static data
projects = [
    Project(
        id=1,
        title="DevPort",
        description="A multi-user portfolio platform",
        tech_stack=["Next.js", "Tailwind", "FastAPI"],
        github_url="https://github.com/codewithsweth/portfolio-app",
        live_url="https://devport.vercel.app"
    ),
    Project(
        id=2,
        title="WeatherApp",
        description="Simple app showing weather by city name",
        tech_stack=["React Native", "Native CLI"],
        github_url="https://github.com/codewithsweth/taskMangerMobile",
        live_url=None
    )
]

@router.get("/", response_model=list[Project])
def get_projects():
    return projects

@router.get('/{project_id}', response_model=Project)
def get_project_by_id(project_id: int):
    for project in projects:
        if project.id == project_id:
            return project
    raise HTTPException(status_code=404, detail="Project not found")
