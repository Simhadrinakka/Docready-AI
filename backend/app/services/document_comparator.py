def compare_documents(documents, ai_required_docs=None, self_certified_docs=None, checked_self_docs=None):
    """
    documents -> list of uploaded document dictionaries
    ai_required_docs -> list of AI-verified document names required for scheme
    self_certified_docs -> list of self-certified document names for scheme
    checked_self_docs -> dict of self-certified document check states
    """
    if ai_required_docs is None:
        ai_required_docs = ["Aadhaar Card", "PAN Card", "Income Certificate", "Bank Passbook"]
    if self_certified_docs is None:
        self_certified_docs = []
    if checked_self_docs is None:
        checked_self_docs = {}

    comparison = {
        "name_match": True,
        "missing_documents": [],
        "summary": []
    }

    uploaded = set()
    names = []

    for doc in documents:
        uploaded.add(doc["document_type"])
        name = doc.get("fields", {}).get("name")
        if name and name.strip():
            names.append(name.strip().lower())

    # Missing AI-verified documents
    missing_ai = [doc for doc in ai_required_docs if doc not in uploaded]

    # Missing self-certified documents (required for scheme but not checked by user)
    missing_self = [
        doc for doc in self_certified_docs
        if not checked_self_docs.get(doc, False)
    ]

    comparison["missing_documents"] = missing_ai + missing_self

    # Name comparison
    valid_names = set(names)
    if len(valid_names) > 1:
        comparison["name_match"] = False

    # Summary
    if comparison["name_match"]:
        comparison["summary"].append("Names match across uploaded documents.")
    else:
        comparison["summary"].append("Name mismatch found.")

    if comparison["missing_documents"]:
        comparison["summary"].append(
            f"Missing documents: {', '.join(comparison['missing_documents'])}"
        )
    else:
        comparison["summary"].append(
            "All required documents provided."
        )

    return comparison