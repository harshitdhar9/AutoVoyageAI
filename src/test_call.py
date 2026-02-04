from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(
    model="meta-llama/llama-3.1-8b-instruct",
    temperature=0.3,
)

response = llm.invoke("Say hello like a travel agent.")
print(response.content)
