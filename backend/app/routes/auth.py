from fastapi import APIRouter, HTTPException
from app.schemas.auth import LoginRequest
from datetime import datetime, timedelta, timezone
import os, jwt

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def Login(request: LoginRequest):
    if request.email != os.getenv("ADMIN_EMAIL") or request.password != os.getenv("ADMIN_PASSWORD"):
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    token = jwt.encode({
        "sub": request.email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=60)
    }, os.getenv("JWT_SECRET"), algorithm=os.getenv("JWT_ALGORITHM", "HS256"))

    return {"access_token": token, "token_type": "bearer"}