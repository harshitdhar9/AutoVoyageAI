from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
import json
import re
import os
from dotenv import load_dotenv

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.2
)

prompt = ChatPromptTemplate.from_template("""
You are a travel assistant.
Return ONLY valid JSON.
Do NOT wrap it in markdown.
Do NOT add explanation.

If searching:
{{
  "action": "search_hotels",
  "city": "...",
  "max_budget": number
}}

If booking:
{{
  "action": "book_hotel",
  "index": number
}}
User input: {input}
""")

def extract_intent(user_input: str):
    chain = prompt | llm
    response = chain.invoke({"input": user_input})
    content = response.content.strip()
    content = re.sub(r"```json|```", "", content).strip()
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        raise ValueError(f"Invalid JSON returned from LLM: {content}")