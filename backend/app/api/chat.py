from fastapi import APIRouter
from pydantic import BaseModel
import uuid

from app.services.hotel_service import search_hotels, book_hotel
from app.services.llm_service import extract_intent
from app.core.redis_client import store_hotels, get_hotels

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None


@router.post("/chat")
async def chat(request: ChatRequest):

    session_id = request.session_id or str(uuid.uuid4())

    intent = extract_intent(request.message)

    if intent["action"] == "search_hotels":
        hotels = search_hotels(intent["city"], intent["max_budget"])
        store_hotels(session_id, hotels)
        return {"session_id": session_id, "results": hotels}

    if intent["action"] == "book_hotel":
        hotels = get_hotels(session_id)
        if not hotels:
            return {"error": "No previous search found."}

        index = intent["index"]
        if index >= len(hotels):
            return {"error": "Invalid selection."}

        booking = book_hotel(hotels[index]["id"])
        return {"session_id": session_id, "booking": booking}

    return {"error": "Unknown action"}