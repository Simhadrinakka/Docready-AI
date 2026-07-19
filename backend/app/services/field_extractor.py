import re


def is_valid_name_line(line: str) -> bool:
    line = line.strip()
    if not line:
        return False

    # A valid human name line must not contain digits or special characters
    if re.search(r"[\d@#$%*&\[\]{}_=+\\/|<>\~^]", line):
        return False

    words = line.split()
    if len(words) < 2 or len(words) > 4:
        return False

    for w in words:
        clean_w = re.sub(r"[^\w]", "", w)
        if len(clean_w) < 2 and not clean_w.isupper():
            return False
        # Reject mixed-case OCR glitches like 'blE', 'aBc'
        if re.search(r"[a-z]+[A-Z]", w):
            return False

    ignore_keywords = [
        "government", "govt", "gove", "india", "unique", "identification", "authority",
        "dob", "male", "female", "year", "birth", "aadhaar", "vid", "address",
        "income", "tax", "department", "permanent", "account", "number", "card",
        "father", "mother", "signature", "enrolment", "download", "date", "issue",
        "statement", "university", "college", "school", "certificate", "copy",
        "group", "times", "plot", "techzone", "noida", "programme", "academic",
        "registration", "batch", "semester", "proof", "help", "portal", "republic",
        "commission", "elections", "voter", "digit", "photo", "holder"
    ]

    lower = line.lower()
    for kw in ignore_keywords:
        if kw in lower:
            return False

    return True


def clean_name(name_str: str) -> str:
    cleaned = re.sub(r"^[^\w]+|[^\w]+$", "", name_str)
    cleaned = re.sub(r"\s+", " ", cleaned)
    return cleaned.title()


def extract_name(text: str):
    if not text:
        return None

    lines = [l.strip() for l in text.split("\n") if l.strip()]

    # Strategy 1: Explicit "Name" label
    for i, line in enumerate(lines):
        line_lower = line.lower()
        if line_lower in ["name", "name:", "name /", "name -", "applicant name", "student name", "candidate name"]:
            if i + 1 < len(lines):
                candidate = lines[i + 1]
                if is_valid_name_line(candidate):
                    return clean_name(candidate)
        elif line_lower.startswith("name:") or line_lower.startswith("name :-") or line_lower.startswith("name-"):
            candidate = re.sub(r"(?i)^name\s*[:\-\/]*\s*", "", line).strip()
            if is_valid_name_line(candidate):
                return clean_name(candidate)

    # Strategy 2: Line before DOB or Gender or YOB
    for i, line in enumerate(lines):
        line_lower = line.lower()
        if any(marker in line_lower for marker in ["dob:", "dob ", "date of birth", "yob:", "year of birth", "male", "female"]):
            for offset in [1, 2]:
                if i - offset >= 0:
                    candidate = lines[i - offset]
                    if is_valid_name_line(candidate):
                        return clean_name(candidate)

    # Strategy 3: General scan for any valid multi-word name line
    for line in lines:
        if is_valid_name_line(line):
            return clean_name(line)

    # Strategy 4: PAN Card or single-word uppercase line combination
    uppercase_words = []
    for line in lines:
        if line.isupper() and len(line) >= 3 and not re.search(r"[\d@#$%*&\[\]{}_=+\\/|<>\~^]", line):
            if not any(kw in line.lower() for kw in ["income", "tax", "department", "permanent", "account", "card", "india", "govt"]):
                uppercase_words.append(line)
    if len(uppercase_words) >= 2:
        return clean_name(" ".join(uppercase_words[:2]))

    return None


def extract_fields(document_type: str, text: str):
    fields = {}

    extracted_n = extract_name(text)
    if extracted_n:
        fields["name"] = extracted_n

    if document_type == "Aadhaar Card":
        aadhaar = re.search(r"\b\d{4}\s\d{4}\s\d{4}\b", text)
        if aadhaar:
            fields["aadhaar_number"] = aadhaar.group()

        dob = re.search(r"\b\d{2}/\d{2}/\d{4}\b", text)
        if dob:
            fields["dob"] = dob.group()

        gender = re.search(r"\b(MALE|FEMALE|Male|Female)\b", text)
        if gender:
            fields["gender"] = gender.group()

    elif document_type == "PAN Card":
        pan = re.search(r"\b[A-Z]{5}[0-9O]{4}[A-Z]\b", text.upper())
        if pan:
            fields["pan_number"] = pan.group()

    elif document_type == "Income Certificate":
        income = re.search(r"\b(?:rs\.?|₹)\s*[\d,]+\b", text.lower())
        if income:
            fields["income"] = income.group()

    elif document_type == "Bank Passbook":
        acc = re.search(r"\b\d{9,18}\b", text)
        if acc:
            fields["account_number"] = acc.group()
        ifsc = re.search(r"\b[A-Z]{4}0[A-Z0-9]{6}\b", text.upper())
        if ifsc:
            fields["ifsc"] = ifsc.group()

    return fields