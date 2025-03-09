from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chat import Chat
from vector_db import VectorDB
import uuid
from faker import Faker
from typings import Job
import os


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


class JobPayload(BaseModel):
    title: str
    company: str
    location: str
    salary: int


def seed_job_records(jobs: list[Job]):
    vector_db = VectorDB()
    chat = Chat()
    vectors = []
    for job in jobs:
        job_id = job["id"]
        del job["id"]
        vector = chat.embedding.embed_query(json.dumps(job))
        vectors.append(vector)
        job["id"] = job_id

    vector_db.seed_records(
        payload=jobs,
        vectors=vectors,
    )


@app.post("/jobs")
def add_new_job(job: JobPayload):
    job_json = job.model_dump()
    seed_job_records(
        jobs=[{"id": str(uuid.uuid4()), **job_json}],
    )
    return True


@app.delete("/jobs")
def delete_jobs():
    vector_db = VectorDB()
    if vector_db.client.collection_exists(VectorDB.JOB_COLLECTION_NAME):
        vector_db.client.delete_collection(VectorDB.JOB_COLLECTION_NAME)
    return True


faker = Faker()


@app.post("/seed-fake-jobs")
def seed_fake_jobs():
    fake_jobs = []
    for _ in range(100):
        fake_jobs.append(
            {
                "id": str(uuid.uuid4()),
                "title": faker.job(),
                "company": faker.company(),
                "location": faker.city(),
                "salary": faker.random_int(min=50000, max=150000),
            }
        )
    seed_job_records(
        jobs=fake_jobs,
    )


@app.delete("/chat-history")
def delete_history():
    file_path = Chat.get_chat_history_path()
    if os.path.exists(file_path):
        os.remove(file_path)
    return True
