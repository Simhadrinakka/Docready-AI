import re

def classify_document(text: str):
    text = text.lower()

    # Aadhaar Card
    aadhaar_score = 0

    if "aadhaar" in text:
        aadhaar_score += 2

    if "government of india" in text:
        aadhaar_score += 2

    if "uidai" in text:
        aadhaar_score += 2

    if re.search(r"\d{4}\s\d{4}\s\d{4}", text):
        aadhaar_score += 3

    if aadhaar_score >= 5:
        return "Aadhaar Card"

    # PAN Card
    text_upper = text.upper()

    # PAN Number (allows OCR confusion between 0 and O)
    if re.search(r"[A-Z]{5}[0-9O]{4}[A-Z]", text_upper):
        return "PAN Card"

    # OCR-friendly keyword matching
    if "INCOME TAX" in text_upper:
        return "PAN Card"

    if "TAX DEPARTMENT" in text_upper:
        return "PAN Card"

    if "PERMANENT" in text_upper:
        return "PAN Card"
    
    # Income Certificate
    if "income certificate" in text:
        return "Income Certificate"

    # Bank Passbook
    if "account number" in text or "ifsc" in text:
        return "Bank Passbook"

    return "Unknown"