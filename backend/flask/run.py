from flask import Flask


from app.routes.growth_stage_prediction_routes import growth_prediction_routes
from app.routes.disease_prediction_routes import disease_prediction_routes

app = Flask(__name__)

@app.route("/")

def server_running():
    return "Server running"

# Route Registry
app.register_blueprint(growth_prediction_routes)
app.register_blueprint(disease_prediction_routes)



if __name__ == "__main__":
    # Run the server
    app.run()
