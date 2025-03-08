import os
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from langchain.prompts.chat import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories.file import FileChatMessageHistory
from langchain.globals import set_debug

set_debug(True)

load_dotenv(override=True)


class Chat:
    AI_SERVER_URL = os.getenv("AI_SERVER_URL")
    VECTOR_DB_URL = os.getenv("VECTOR_DB_URL")
    prompt_template = ChatPromptTemplate.from_messages(
        messages=[
            (
                "system",
                """You're an assistant that is designed to answer questions regarding jobs only. 
                If certain data from the given jobs context is not relevant with the asked question, filter them out and exclude them in the final response.
                Here's the list of jobs: {context}.
                -------------------------------------------------
                Always return the value in plain text with no formatting.
                """,  # The key {context} is used internally so should be present as exact key indicating the document context
            ),
            (
                "system",
                "Now, here's the history of the previous messages of this chat:",
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            (
                "human",
                "{input}",
            ),
        ]
    )

    @staticmethod
    def get_chat_history_path():
        pwd = os.path.join(os.path.dirname(os.path.abspath(__file__)))
        chat_history_path = os.path.join(pwd, "chat-history.json")
        return chat_history_path

    def __init__(self):
        self.llm = ChatOpenAI(
            base_url=Chat.AI_SERVER_URL,
            api_key=".",
        )

        self.embedding = OpenAIEmbeddings(
            base_url=Chat.AI_SERVER_URL,
            check_embedding_ctx_length=False,  # Important
            api_key=".",
        )

        self.vector_db = QdrantClient(url=Chat.VECTOR_DB_URL)

    def invoke(self, question: str):
        chat_history = FileChatMessageHistory(file_path=Chat.get_chat_history_path())
        hits = self.vector_db.query_points(
            collection_name="job",
            query=self.embedding.embed_query(question),
        ).points

        matches = []
        for hit in hits:
            matches.append(hit.payload["page_content"])

        prompt = Chat.prompt_template.format(
            context=str(matches),
            input=question,
            chat_history=chat_history.messages,
        )
        res = self.llm.invoke(
            input=prompt,
        )
        chat_history.add_user_message(question)
        chat_history.add_ai_message(res.content)
        return res
