from flask import Flask, request, jsonify
from chtbot import combined_model  # Assuming model is correctly imported
from flask_cors import CORS
from storage import get_session_history, flush


app = Flask(__name__)
CORS(app)  # Allow Cross-Origin Requests

import requests
from flask import request, jsonify

@app.route('/api/ai-chatbot', methods=['POST'])
def process_request():
    try:
        # Get the JSON data sent from the frontend
        data = request.get_json()

        # Retrieve the user query from the data
        user_query = data.get('query', '')  # Default to empty string if not present
        building_id = data.get('buildingId', '')  # Get building ID if provided
        print(building_id)

        # Check if the query is empty
        if not user_query:
            return jsonify({'error': 'Query is required'}), 400  # Bad request if no query

        # Print out user query and building_id (useful for debugging)
        print(f"Received query: {user_query}")
        print(f"Building ID: {building_id}")

        # If building_id is provided, fetch data from the external API
        if building_id:
            try:
                building_data_response = requests.get(f'http://localhost:5000/llm/{building_id}')
                print(type(building_data_response))
                if building_data_response.status_code == 200:
                    building_data = building_data_response.json()
                    print(f"Building data: {building_data}")
                    print(type(building_data))
                else:
                    print(f"Failed to fetch building data. Status Code: {building_data_response.status_code}")
                    building_data = None
            except Exception as e:
                print(f"Error fetching building data: {e}")
                building_data = None
        else:
            building_data = None

        print("bhadwa chutiya sala ")
        print(type(building_data))
        print(building_data['data'][0]['five_year_return'])

        # Get response from the AI model (assuming model is properly implemented)
        response = combined_model(user_query,building_data)  # Pass building data to the model if available

        # Log the response (optional for debugging)
        print(f"AI Response: {response}")

        # Return the response from the model
        return jsonify({'reply': response})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred while processing the request'}), 500
    


@app.route("/flush", methods=["POST"])
def flush_store():
    flush()  # Call the flush function to clear the store
    return jsonify({"message": "Store has been flushed!"})


if __name__ == '__main__':
    app.run(port=4000)  # Runs the app on localhost:4000
