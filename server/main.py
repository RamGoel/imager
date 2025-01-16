from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware

from PIL import Image
import io

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/resize")
async def resize_image(
    file: UploadFile = File(...),
    width: int = None,
    height: int = None
):
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    

    try:
        # Read the image
        image_data = await file.read()
        img = Image.open(io.BytesIO(image_data))
        
        # Calculate new dimensions maintaining aspect ratio
        original_width, original_height = img.size
        aspect_ratio = original_width / original_height
        
        if width and height:
            new_width, new_height = width, height
        elif width:
            new_width = width
            new_height = int(width / aspect_ratio)
        else:
            new_height = height
            new_width = int(height * aspect_ratio)
        
        # Resize image
        resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Convert to bytes
        img_byte_arr = io.BytesIO()
        resized_img.save(img_byte_arr, format=img.format)
        img_byte_arr = img_byte_arr.getvalue()
        
        print(file.content_type)
        return Response(
            content=img_byte_arr,
            media_type=file.content_type
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))