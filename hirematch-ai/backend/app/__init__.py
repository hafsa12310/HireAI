from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")

    # Enable CORS
    # FRONTEND_URL may be a comma-separated list; trailing slashes are stripped
    # because the browser's Origin header never includes one
    frontend_urls = [
        url.strip().rstrip("/")
        for url in os.getenv("FRONTEND_URL", "").split(",")
        if url.strip()
    ]

    CORS(
      app,
      resources={
          r"/*": {
              "origins": [
                  *frontend_urls,
                  "http://localhost:5173",
              ]
          }
      },
  )

    from app.routes import main
    app.register_blueprint(main)

    return app