from flask import Flask, render_template, request
from flask.views import MethodView
from flask_restful import Api, Resource  # type: ignore

from .gpt import generate_lawyer_suggestion

app = Flask(__name__, template_folder="../dist", static_folder="../dist", static_url_path="")
api = Api(app)


class Home(MethodView):
    def get(self) -> str:
        return render_template("taskpane.html")


class LawyerResponse(Resource):
    def post(self) -> tuple[dict[str, str], int]:
        initial_text = request.get_json().get("initial_text", None)
        if not initial_text:
            return {"error": "No initial text provided"}, 400
        else:
            response = {"suggestion": generate_lawyer_suggestion(initial_text)}
            return response, 200


app.add_url_rule("/", view_func=Home.as_view("home"))
api.add_resource(LawyerResponse, "/lawyer")
