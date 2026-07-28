from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")

    # Enable CORS
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

    CORS(
      app,
      resources={
          r"/*": {
              "origins": [
                  frontend_url,
                  "http://localhost:5173",
              ]
          }
      },
  )

    from app.routes import main
    app.register_blueprint(main)

    return app