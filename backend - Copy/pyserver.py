from flask import Flask,request,jsonify
from chtbot import model
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/api/ai-chatbot',methods=['POST'])
def process_request():
    data = request.json
    user_query = data['query'] #Get the query from the javascript
    print(user_query)
    # simulate LLm response
    response = model(user_query)
    print(response)

    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(port=4000) # runs on localhost: 4000