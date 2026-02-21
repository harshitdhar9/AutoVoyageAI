import redis
import json

redis_client = redis.Redis(
    host="localhost",
    port=6379,
    decode_responses=True
)
def store_hotels(session_id: str, hotels: list):
    redis_client.set(f"hotels:{session_id}", json.dumps(hotels), ex=3600)
    
def get_hotels(session_id: str):
    data = redis_client.get(f"hotels:{session_id}")
    return json.loads(data) if data else []