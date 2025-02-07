import os
import pandas as pd
from transformers import pipeline
from langchain_groq import ChatGroq
from langchain.schema import AIMessage,HumanMessage,SystemMessage
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler,LabelEncoder
# import torch 
import joblib
import tensorflow.keras as tf

scaler = joblib.load("sscaler.pkl")

ann_model = tf.models.load_model("my_ann_model.h5")

print(ann_model)

llm = ChatGroq(api_key=groq_api_key, model_name = "Llama3-8b-8192")

def preprocess_input(query):
    if " return" in query.lower():
        return True  # Relevant to ANN
    return False  # Not relevant


def invoke_ann(input_data):
    # Convert input_data (dictionary) to a DataFrame
    df = pd.DataFrame([input_data])
    
    # Transform the input data using the scaler
    scaled_data = scaler.transform(df)
    
    # Make predictions using the ANN model
    prediction = ann_model.predict(scaled_data)
    return prediction[0][0]


# Main pipeline
def combined_model(query):
    if preprocess_input(query):
        # ANN-specific query
        input_data = {
            'Last_5_Year_Return (%)':70.9,
            'Last_1_Year_Return (%)':12.19,
            'Population_Growth (%)' : 3.82,
            'Medical_Facilities (Score)':3.757,
            'Transportation_Access (Score)': 5.516,
            'Market_Facilities (Score)': 8.33,
            'Job_Opportunity_Rate (%)': 44.21,
            'Area_Developing_Rate (%)':19.78,
            'Greater_Return (Score)': 5.07,
        }
        prediction = invoke_ann(input_data)
        llm_response = llm.invoke(f"The predicted return is {prediction:.2f}.")
    else:
        # General query
        chat_messages = [
            SystemMessage("Hello, you are a expert chatbot in advising releted the real state. if query is outside this domain then say directly that i cannot help in this topic"),
            HumanMessage(content=f"{query}")
        ]
        llm_response = llm(chat_messages)
    
    return llm_response.content

# Example Usage
# user_query = "what is the real estate return?"
# response = combined_model(user_query)
# print(response)