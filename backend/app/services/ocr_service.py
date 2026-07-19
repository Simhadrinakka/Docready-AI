import easyocr
import fitz  # PyMuPDF
import numpy as np
from PIL import Image, ImageEnhance

reader = easyocr.Reader(["en"], gpu=False)


def extract_text(file_path: str):
    text = ""

    if file_path.lower().endswith(".pdf"):
        pdf = fitz.open(file_path)

        for page in pdf:
            pix = page.get_pixmap(dpi=300)
            img = Image.frombytes(
                "RGB",
                [pix.width, pix.height],
                pix.samples
            )

            result = reader.readtext(np.array(img), detail=0)
            text += "\n".join(result)

        pdf.close()

    else:
        img = Image.open(file_path).convert("L")   # grayscale

        # Upscale image 2x
        width, height = img.size
        img = img.resize((width * 2, height * 2), Image.Resampling.LANCZOS)

        # Increase contrast
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(2.0)

        result = reader.readtext(
            np.array(img),
            detail=0,
            rotation_info=[90, 180, 270]
        )

        text = "\n".join(result)

    return text