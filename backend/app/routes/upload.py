from fastapi import APIRouter, UploadFile, File, Form
from app.services.ocr_service import extract_text
from typing import List
import json
from app.utils.file_utils import save_uploaded_file
from app.services.document_classifier import classify_document
from app.services.field_extractor import extract_fields
# from app.services.gemini_service import extract_document_details
from app.services.validator import validate_document
from app.services.readiness_score import calculate_readiness_score
from app.services.recommendation_service import generate_recommendations
from app.services.document_comparator import compare_documents


USE_GEMINI = False


router = APIRouter(prefix="/api", tags=["Upload"])



@router.post("/upload")
async def upload_files(
    files: List[UploadFile] = File(...),
    aiRequiredDocs: str = Form("[]"),
    selfCertifiedDocs: str = Form("[]"),
    checkedSelfDocs: str = Form("{}")
):
    print("=== UPLOAD API CALLED ===")

    try:
        ai_req_docs = json.loads(aiRequiredDocs)
    except Exception:
        ai_req_docs = None

    try:
        self_cert_docs = json.loads(selfCertifiedDocs)
    except Exception:
        self_cert_docs = None

    try:
        checked_self_docs_dict = json.loads(checkedSelfDocs)
    except Exception:
        checked_self_docs_dict = None

    uploaded_files = []

    for file in files:
        print(f"Processing: {file.filename}")

        file_path = save_uploaded_file(file)

        print("Calling OCR...")

        text = extract_text(file_path)

        print("\n===== OCR TEXT =====")
        print(text[:1500])   # Print the first 1500 characters
        print("====================\n")

        if len(text.strip()) < 50:
            print("OCR quality too low.")

            uploaded_files.append({
                "filename": file.filename,
                "document_type": "Unknown",
                "fields": {},
                "issues": ["OCR Failed"],
                "readiness": {
                    "score": 0,
                    "status": "OCR Failed"
                },
                "recommendations": [
                    "Unable to extract enough text from this document.",
                    "Please upload a clearer image or a higher-quality scan."
                ],
                "content_type": file.content_type,
                "extracted_text": text,
            })

            continue

        document_type = classify_document(text)
        if document_type == "Unknown":
            issues = []
            readiness = {
                "score": 0,
                "status": "Unknown Document"
            }
            recommendations = [
                "This document type is not supported yet."
            ]

            print("Detected Document:", document_type)
            print("Readiness:", readiness)
            print("Recommendations:", recommendations)
            print("Returning response for Unknown document")

            uploaded_files.append({
                "filename": file.filename,
                "document_type": document_type,
                "fields": {},
                "issues": issues,
                "readiness": readiness,
                "recommendations": recommendations,
                "content_type": file.content_type,
                "extracted_text": text,
            })

            continue


        if USE_GEMINI:
            pass
        
        ai_fields = {}

        fields = extract_fields(document_type, text)
        issues = validate_document(document_type, fields)

        readiness = calculate_readiness_score(
            document_type,
            fields,
            issues,
        )

        recommendations = generate_recommendations(
            document_type,
            issues
        )

        print("Recommendations:", recommendations)

        print("Readiness:", readiness)

        print("Validation Issues:", issues)


        print(f"Detected Document: {document_type}")

        print("OCR Finished")
        print(f"Extracted text length: {len(text)}")

        uploaded_files.append({
            "filename": file.filename,
            "document_type": document_type,
            "fields": fields,
            "issues": issues,
            "readiness": readiness,
            "recommendations": recommendations,
            "content_type": file.content_type,
            "extracted_text": text
        })

    comparison = compare_documents(
        uploaded_files,
        ai_required_docs=ai_req_docs,
        self_certified_docs=self_cert_docs,
        checked_self_docs=checked_self_docs_dict
    )

    print("\n===== DOCUMENT COMPARISON =====")
    print(comparison)
    print("===============================\n")


    print("Returning response")

    return {
        "success": True,
        "total_files": len(uploaded_files),
        "files": uploaded_files,
        "comparison": comparison
    }