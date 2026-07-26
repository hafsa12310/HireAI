from flask import Blueprint, jsonify, render_template, request
from app.services.resume_parser import extract_pdf_text
from app.services.ai_analyzer import analyze_resume

main = Blueprint("main", __name__)


def format_analysis_response(result):
    return {
        "score": result.get("score", result.get("match_score", 0)),
        "summary": result.get("summary", ""),
        "matchedSkills": result.get("matchedSkills", result.get("matched_skills", [])),
        "missingSkills": result.get("missingSkills", result.get("missing_skills", [])),
        "improvements": result.get(
            "improvements",
            result.get("resume_improvements", []),
        ),
        "interviewQuestions": result.get(
            "interviewQuestions",
            result.get("interview_questions", []),
        ),
        "recommendations": result.get(
            "recommendations",
            [result["final_recommendation"]]
            if result.get("final_recommendation")
            else [],
        ),
    }


@main.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response

@main.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        resume_file = request.files["resume"]
        job_description = request.form["job_description"]
        model = request.form["model"]

        resume_text = extract_pdf_text(resume_file)
        result = analyze_resume(resume_text, job_description, model)

        return render_template("result.html", result=result)

    return render_template("index.html")


@main.route("/analyze", methods=["POST", "OPTIONS"])
def analyze():
    if request.method == "OPTIONS":
        return ("", 204)

    resume_file = request.files.get("resume")
    job_description = request.form.get("job_description", "")
    model = request.form.get("model", "granite")

    if not resume_file or not job_description:
        return jsonify({"error": "resume and job_description are required"}), 400

    resume_text = extract_pdf_text(resume_file)
    result = analyze_resume(resume_text, job_description, model)

    return jsonify(format_analysis_response(result))
