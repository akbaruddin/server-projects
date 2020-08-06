import os
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5000/",
    "http://localhost",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return { "hello": "world" }


class Item(BaseModel):
    clientId: str
    credential: str
    select_by: str


@app.post("/one-tap-login")
def read_google_login(item: Item):
    getData = item.dict()
    # print(getData.get('clientId'))
    idinfo = id_token.verify_oauth2_token(getData.get('credential'), requests.Request(), os.getenv("GOOGLE_CLIENT_ID"))
    return idinfo