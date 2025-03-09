import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
from typings import Job

load_dotenv(
    override=True,
)


class VectorDB:
    VECTOR_DB_URL = os.getenv("VECTOR_DB_URL")
    OPEN_AI_EMBED_DIMENSION = os.getenv("OPEN_AI_EMBED_DIMENSION")

    JOB_COLLECTION_NAME = "job"

    def __init__(self):
        self.client = QdrantClient(VectorDB.VECTOR_DB_URL)

    def setup_job_collection(self) -> str:
        """
        Create job collection if not exists.
        Returns:
            str: Collection name
        """
        if not self.client.collection_exists(VectorDB.JOB_COLLECTION_NAME):
            self.client.create_collection(
                collection_name=VectorDB.JOB_COLLECTION_NAME,
                vectors_config=VectorParams(
                    size=int(VectorDB.OPEN_AI_EMBED_DIMENSION),
                    distance=Distance.COSINE,
                ),
            )
        return VectorDB.JOB_COLLECTION_NAME

    def seed_records(
        self,
        payload: list[Job],
        vectors: list[list[float]],
    ):
        """
        Seed new records into job collection.
        Args:
            payload: Jobs payload
            vectors: Corresponding vectors of the payload
        """
        collection_name = self.setup_job_collection()
        self.client.upsert(
            collection_name=collection_name,
            wait=True,
            points=[
                PointStruct(
                    id=p["id"],
                    vector=vectors[idx],
                    payload=p,
                )
                for idx, p in enumerate(payload)
            ],
        )
