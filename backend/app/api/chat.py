from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.travel_agent import travel_agent

router = APIRouter()
class ChatRequest(BaseModel):
    message: str
    
@router.post("/chat")
async def chat(request: ChatRequest):
    response = travel_agent.run(request.message)
    return {"response": response}