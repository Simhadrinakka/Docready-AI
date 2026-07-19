def generate_recommendations(document_type: str, issues: list):
    recommendations = []

    if not issues:
        recommendations.append("Document looks complete and ready for submission.")
        return recommendations

    issue_map = {
        "Name not detected": "Ensure the applicant's name is clearly visible.",
        "Aadhaar Number not detected": "Upload a clearer Aadhaar card with the full number visible.",
        "Date of Birth not detected": "Make sure the Date of Birth is readable.",
        "Gender not detected": "Upload a higher-quality copy showing the gender field.",
        "Income not detected": "Upload a valid Income Certificate.",
        "Account Number not detected": "Upload a readable bank passbook or statement.",
    }

    for issue in issues:
        recommendations.append(issue_map.get(issue, issue))

    return recommendations