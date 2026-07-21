import easyocr
import fitz  # PyMuPDF
import numpy as np
from PIL import Image, ImageEnhance

reader = easyocr.Reader(["en"], gpu=False)


def extract_text(file_path: str):
    print("OCR: Started")

    text = ""

    if file_path.lower().endswith(".pdf"):
        print("OCR: Opening PDF")
        pdf = fitz.open(file_path)

        for i, page in enumerate(pdf):
            print(f"OCR: Processing page {i + 1}")

            pix = page.get_pixmap(dpi=100)

            img = Image.frombytes(
                "RGB",
                [pix.width, pix.height],
                pix.samples
            )

            print("OCR: Before readtext")

            print("Skipping OCR")
            result = ["TEST OCR"]
            print("After fake OCR")

            print("OCR: After readtext")

            text += "\n".join(result)

        pdf.close()

    else:
        print("OCR: Opening image")

        img = Image.open(file_path).convert("L")

        width, height = img.size
        img = img.resize((width * 2, height * 2), Image.Resampling.LANCZOS)

        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(2.0)

        print("OCR: Before readtext")

        print("Skipping OCR")
        result = ["TEST OCR"]
        print("After fake OCR")

        print("OCR: After readtext")

        text = "\n".join(result)

    print("OCR: Finished")

    return text