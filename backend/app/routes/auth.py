from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta, timezone
import os, jwt

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # form_data.username and form_data.password match what Swagger sends
    if (
        form_data.username != os.getenv("ADMIN_EMAIL")
        or form_data.password != os.getenv("ADMIN_PASSWORD")
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    expiry = datetime.now(timezone.utc) + timedelta(minutes=int(os.getenv("JWT_EXPIRY_MINUTES", "60")))
    to_encode = {"sub": form_data.username, "exp": expiry}
    token = jwt.encode(to_encode, os.getenv("JWT_SECRET"), algorithm=os.getenv("JWT_ALGORITHM", "HS256"))

    return {"access_token": token, "token_type": "bearer"}
