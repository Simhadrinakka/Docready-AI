from fastapi import APIRouter, UploadFile, File
from typing import List
import os
import shutil

router = APIRouter(prefix="/api", tags=["Upload"])

UPLOAD_DIR = "app/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    uploaded_files = []

    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        uploaded_files.append({
            "filename": file.filename,
            "content_type": file.content_type
        })

    return {
        "success": True,
        "total_files": len(uploaded_files),
        "files": uploaded_files
    }