from flask import Flask,request,jsonify
from chtbot import model
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

BUILDER_API = "http://localhost:5000/builder"
REALESTATE_API = "http://localhost:5000/api/realestate/build"

# @app.route('/api/ai-chatbot',methods=['POST'])
# def process_request():
#     data = request.json
#     user_query = data['query'] #Get the query from the javascript
#     print(user_query)
#     # simulate LLm response
#     response = model(user_query)
#     print(response)

#     return jsonify({'reply': response})
@app.route('/api/ai-chatbot', methods=['POST'])
def process_request():
    try:
        data = request.json
        user_query = data.get('query')
        building_id = request.args.get('id')  # Expecting ID from frontend
        print(building_id)
        print(user_query)
        if not user_query or not building_id:
            return jsonify({"error": "Missing query or building ID"}), 400

        # Fetch builder details
        builder_response = requests.get(f"{BUILDER_API}/{building_id}")
        builder_data = builder_response.json() if builder_response.status_code == 200 else {}

        # Fetch real estate details
        realestate_response = requests.get(f"{REALESTATE_API}/{building_id}")
        realestate_data = realestate_response.json() if realestate_response.status_code == 200 else {}
        print(realestate_data)
        print(builder_data)

        # Generate AI response
        ai_response = model(user_query)

        return jsonify({"reply": ai_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=4000) # runs on localhost: 4000