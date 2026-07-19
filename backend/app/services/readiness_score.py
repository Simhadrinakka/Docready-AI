def calculate_readiness_score(document_type: str, fields: dict, issues: list):
    score = 100

    deductions = {
        "Name not detected": 25,
        "Aadhaar Number not detected": 30,
        "Date of Birth not detected": 20,
        "Gender not detected": 10,
        "Income not detected": 20,
        "Account Number not detected": 20,
    }

    for issue in issues:
        score -= deductions.get(issue, 10)

    score = max(score, 0)

    return {
        "score": score,
        "status": (
            "Ready"
            if score >= 90
            else "Needs Review"
            if score >= 70
            else "Incomplete"
        ),
    }