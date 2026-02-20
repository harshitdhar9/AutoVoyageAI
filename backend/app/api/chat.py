from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.travel_agent import travel_agent
import uuid

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None


@router.post("/chat")
async def chat(request: ChatRequest):

    session_id = request.session_id or str(uuid.uuid4())

    response = travel_agent.invoke({
        "input": request.message,
        "session_id": session_id
    })

    return {
        "response": response["output"],
        "session_id": session_id
    }