server.dev:
	uv run fastapi dev ./src/server.py

docker.up:
	docker network create langchain || true; \
	docker compose -f ./docker-compose.yml up -d