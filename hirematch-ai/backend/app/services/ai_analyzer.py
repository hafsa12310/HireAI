from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser

from app.prompts.templates import RESUME_ANALYSIS_PROMPT
from app.services.watsonx_service import get_watsonx_llm

def analyze_resume(resume_text, job_description, model_name):
    parser = JsonOutputParser()

    prompt = PromptTemplate(
        template=RESUME_ANALYSIS_PROMPT,
        input_variables=["resume_text", "job_description"]
    )

    llm = get_watsonx_llm(model_name)

    chain = prompt | llm | parser

    result = chain.invoke({
        "resume_text": resume_text,
        "job_description": job_description
    })

    return result