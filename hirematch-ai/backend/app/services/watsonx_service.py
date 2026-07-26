import os
from langchain_ibm import WatsonxLLM

MODEL_IDS = {
    "granite": "ibm/granite-4-h-small",
    "llama": "meta-llama/llama-3-3-70b-instruct",
    "mixtral": "mistralai/mistral-small-3-1-24b-instruct-2503"
}

def get_watsonx_llm(model_name):
    api_key = os.getenv("WATSONX_API_KEY")
    project_id = os.getenv("WATSONX_PROJECT_ID")
    url = os.getenv("WATSONX_URL")
    return WatsonxLLM(
        model_id=MODEL_IDS[model_name],
        url=url,
        project_id=project_id,
        apikey=api_key,
        params={
            "decoding_method": "greedy",
            "max_new_tokens": 1000,
            "temperature": 0
        }
    )