import os
from langchain_groq import ChatGroq

# Groq free tier: https://console.groq.com/keys (no credit card needed)
PRIMARY_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
FALLBACK_MODEL = os.getenv("GROQ_FALLBACK_MODEL", "openai/gpt-oss-20b")

def _groq(model_id):
    return ChatGroq(
        model=model_id,
        api_key=os.getenv("GROQ_API_KEY"),
        temperature=0,
        max_tokens=1000,
        max_retries=2,
        model_kwargs={"response_format": {"type": "json_object"}}
    )

def get_llm(model_name=None):
    # model_name is accepted for compatibility with the frontend's model selector;
    # if the primary model is rate-limited or down, the request falls back to a smaller one
    return _groq(PRIMARY_MODEL).with_fallbacks([_groq(FALLBACK_MODEL)])
