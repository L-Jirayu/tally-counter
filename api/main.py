#RUN: python -m uvicorn main:app --reload 
#API Check web: http://127.0.0.1:8000/docs#/

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # อนุญาตทุกที่ ถ้าจะกำหนดโดเมนให้เปลี่ยนตรงนี้
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CountResponse(BaseModel):
    count: int
    message: str

count_data = {"count": 0}

@app.get("/count", response_model=CountResponse)
async def get_count():
    return CountResponse(count=count_data["count"], message="ดึงข้อมูลสำเร็จ")

@app.post("/count/increment", response_model=CountResponse)
async def increment():
    count_data["count"] += 1
    return CountResponse(count=count_data["count"], message="เพิ่ม count เรียบร้อย")

@app.post("/count/decrement", response_model=CountResponse)
async def decrement():
    if count_data["count"] <= 0:
        raise HTTPException(status_code=400, detail="ไม่สามารถลด count ลงต่ำกว่า 0 ได้")
    count_data["count"] -= 1
    return CountResponse(count=count_data["count"], message="ลด count เรียบร้อย")

@app.post("/count/reset", response_model=CountResponse)
async def reset():
    if count_data["count"] == 0:
        raise HTTPException(status_code=400, detail="ไม่สามารถลด count ลงต่ำกว่า 0 ได้")
    count_data["count"] = 0
    return CountResponse(count=0, message="รีเซ็ต count เป็น 0 เรียบร้อย")
