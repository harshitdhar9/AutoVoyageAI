from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import initialize_agent, AgentType
from app.agents.tools import search_hotels, calculate_budget, generate_itinerary

llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    temperature=0.3
)
tools = [
    search_hotels,
    calculate_budget,
    generate_itinerary
]
travel_agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.OPENAI_FUNCTIONS,
    verbose=True
)