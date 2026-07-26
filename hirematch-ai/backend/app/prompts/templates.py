RESUME_ANALYSIS_PROMPT = """
You are an expert AI recruitment assistant.

Analyze the candidate resume against the job description.

Return ONLY valid JSON. Do not include markdown.

Resume:
{resume_text}

Job Description:
{job_description}

Return JSON with this structure:
{{
  "match_score": number from 0 to 100,
  "summary": "short summary",
  "matched_skills": ["skill1", "skill2"],
  "missing_skills": ["skill1", "skill2"],
  "resume_improvements": ["improvement1", "improvement2"],
  "interview_questions": ["question1", "question2"],
  "final_recommendation": "Hire / Maybe / Reject with reason"
}}
"""