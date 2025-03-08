from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chat import Chat

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/messages")
def messages():
    chat_history_path = Chat.get_chat_history_path()
    try:
        with open(chat_history_path, "r") as file:
            chat_history_json = json.loads(file.read())
            return chat_history_json
    except FileNotFoundError:
        with open(chat_history_path, "w") as file:
            file.write("[]")
    return []


class MessagePayload(BaseModel):
    message: str


@app.post("/messages")
def new_message(payload: MessagePayload):
    chat = Chat()
    res = chat.invoke(payload.message)
    return res
