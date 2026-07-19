import os
import json

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def extract_document_details(ocr_text: str):
    prompt = f"""
You are an expert document verification AI.

Extract the information from this OCR text.

Return ONLY a JSON object.

OCR:
{ocr_text}
"""

    try:
        MODELS = [
            "gemini-3.5-flash",
            "gemini-2.0-flash",
            "gemini-flash-latest",
        ]

        response = None

        for model in MODELS:
            try:
                print(f"Trying {model}")

                response = client.models.generate_content(
                    model=model,
                    contents=prompt,
                )

                print(f"Success using {model}")
                break

            except Exception as e:
                print(f"{model} failed:", e)

        if response is None:
            raise Exception("All Gemini models failed.")

        text = response.text.strip()

        print("\n===== GEMINI RAW RESPONSE =====")
        print(text)
        print("===============================\n")

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)

    except Exception as e:
        print("Gemini Error:", e)
        return {}