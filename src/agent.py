from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent

from tools import get_weather, get_travel_plan

load_dotenv()

model = ChatOpenAI(
    model="gpt-4o",
    temperature=0.2,
)

SYSTEM_PROMPT = """
You are AutoVoyage AI, a travel assistant.

RULES (MANDATORY):
- You MUST use tools to answer.
- If the user asks for a trip plan → call get_travel_plan.
- If the user asks about weather → call get_weather.
- Do NOT respond without calling tools.
"""

agent = create_agent(
    model=model,
    tools=[get_weather, get_travel_plan],
    system_prompt=SYSTEM_PROMPT
)
