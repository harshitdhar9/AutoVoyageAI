import os
import json
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

# Load environment variables from backend/.env
load_dotenv()

# Read API key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in environment variables.")

# Initialize LLM with explicit api_key
llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    api_key=GOOGLE_API_KEY,
    temperature=0.2
)

prompt = ChatPromptTemplate.from_template("""
You are a travel assistant.

Return only valid JSON.

If searching:
{
  "action": "search_hotels",
  "city": "...",
  "max_budget": number
}

If booking:
{
  "action": "book_hotel",
  "index": number
}

User input: {input}
""")

def extract_intent(user_input: str):
    chain = prompt | llm
    response = chain.invoke({"input": user_input})

    try:
        return json.loads(response.content)
    except Exception:
        raise ValueError(f"Invalid JSON returned from LLM: {response.content}")