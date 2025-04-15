from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chat_models import init_chat_model
from langchain_google_genai import ChatGoogleGenerativeAI



import os

# Load dummy data
with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

load_dotenv()

app = FastAPI()

# LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-001",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)


# Prompt
prompt_template = ChatPromptTemplate(
    messages=[
        SystemMessagePromptTemplate.from_template(
        """
You are a helpful and intelligent sales data assistant embedded in a sales dashboard. Your job is to help users understand and explore sales data through natural conversation. You have access to structured data, including sales representatives, deals, clients, regions, and performance metrics.

Context Data:
{context}

Behavior Guidelines:
Respond with clear, concise, and insightful answers about sales activity.

Use business-friendly language to explain insights and trends.

If a question lacks necessary information (e.g. date range, region, product), ask for clarification.

Refer to numbers, percentages, and trends when relevant.

When possible, guide users with follow-up questions or suggestions to dig deeper.

Structure responses using charts or tables when supported by the interface.

Be proactive, data-driven, and helpful in guiding users to make informed sales decisions.
        """
        ),
        HumanMessagePromptTemplate.from_template("{question}"),
    ]
)


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/api/sales-reps")
def get_sales_reps():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA

class AiDto(BaseModel):
    question: str

@app.post("/api/ai")
async def ai_endpoint(request: AiDto):
    """
    Accepts a user question and returns a placeholder AI response.
    (Optionally integrate a real AI model or external service here.)
    """

    prompt = prompt_template.invoke({"context": DUMMY_DATA, "question": request.question})
    response = llm.invoke(prompt)
    
    # Placeholder logic: echo the question or generate a simple response
    # Replace with real AI logic as desired (e.g., call to an LLM).
    return {"answer": response.content}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
