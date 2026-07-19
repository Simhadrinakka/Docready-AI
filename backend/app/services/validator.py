def validate_document(document_type: str, fields: dict):
    issues = []

    if document_type == "Aadhaar Card":

        if not fields.get("aadhaar_number"):
            issues.append("Aadhaar Number not detected")

        if not fields.get("dob"):
            issues.append("Date of Birth not detected")

        if not fields.get("gender"):
            issues.append("Gender not detected")

        if not fields.get("name"):
            issues.append("Name not detected")

    elif document_type == "Income Certificate":

        if not fields.get("income"):
            issues.append("Income not detected")

    elif document_type == "Bank Passbook":

        if not fields.get("account_number"):
            issues.append("Account Number not detected")

    return issues