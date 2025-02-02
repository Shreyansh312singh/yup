import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
LLM = ChatGroq(model="Gemma2-9b-It",groq_api_key=groq_api_key)

def model(query):
    return LLM.invoke(query).content
