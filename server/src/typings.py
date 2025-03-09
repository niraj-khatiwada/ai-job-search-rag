from typing import TypedDict


class Job(TypedDict):
    id: str
    title: str
    company: str
    location: str
    salary: int
