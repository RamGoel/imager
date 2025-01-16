from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware

from PIL import Image
import io
from rembg import remove

app = FastAPI()

origins = [
    "http://localhost:3000",
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
    width: int = Query(default=None),
    height: int = Query(default=None)
):
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    

    print(width, height)
    try:
        # Read the image
        image_data = await file.read()
        img = Image.open(io.BytesIO(image_data))
        
        # Resize image
        resized_img = img.resize((width, height), Image.Resampling.LANCZOS)
        
        # Convert to bytes
        img_byte_arr = io.BytesIO()
        resized_img.save(img_byte_arr, format=img.format)
        img_byte_arr = img_byte_arr.getvalue()
        
        return Response(
            content=img_byte_arr,
            media_type=file.content_type
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post('/remove-bg')
async def removeImageBg(    
    file: UploadFile = File(...),
):
     # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    

    try:
        # Read the image
        image_data = await file.read()
        img = Image.open(io.BytesIO(image_data))
        
        output_image = remove(img)

        img_byte_arr = io.BytesIO()
        output_image.save(img_byte_arr, format=img.format)
        img_byte_arr = img_byte_arr.getvalue()


        return Response(
            content=img_byte_arr,
            media_type=file.content_type
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))