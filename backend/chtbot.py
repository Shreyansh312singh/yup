# import pandas as pd
# import joblib
# import tensorflow as tf
# import streamlit as st
# from langchain_groq import ChatGroq
# from langchain.schema import HumanMessage, SystemMessage
# from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
# from langchain_core.runnables.history import RunnableWithMessageHistory

# scaler = joblib.load("sscaler.pkl")
# ann_model = tf.keras.models.load_model("my_ann_model.h5")
# groq_api_key = "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"
# llm = ChatGroq(api_key=groq_api_key, model_name="Llama3-8b-8192")

# def invoke_ann(input_data):
#     df = pd.DataFrame([input_data])
#     scaled_data = scaler.transform(df)
#     prediction = ann_model.predict(scaled_data)
#     return prediction[0][0]

# def combined_model(query, in_data=None):
#     in_data = in_data['data'][0];
#     if in_data is None:
#         input_data = {
#             '5_year_return': 105.92,
#             '1_year_return': 15.60,
#             'x_coordinate': 26.9124,
#             'y_coordinate': 75.7873,
#             'property_age': 21,
#             'area_dev_rate': 2,
#             'square_foot_price': 10469,
#             'facilities_rate': 4,
#         }
#     else:
#         input_data = {
#             '5_year_return': in_data['five_year_return'],
#             '1_year_return': in_data['one_year_return'],
#             'x_coordinate': in_data['x_coordinate'],
#             'y_coordinate': in_data['y_coordinate'],
#             'property_age': in_data['property_age'],
#             'area_dev_rate': in_data['area_dev_rate'],
#             'square_foot_price': in_data['square_foot_price'],
#             'facilities_rate': in_data['facilities_rate'],
#         }
    
#     prediction = invoke_ann(input_data)
#     print(f"Predicted return: {prediction}%")
    
#     system_message = f"""You are an expert real estate investment advisor with deep knowledge of property markets. Based on our AI analysis, we have calculated that this property's predicted return for next year is {prediction:.2f}%.

# Key property metrics:
# - Historical returns: {input_data['5_year_return']}% (5-year), {input_data['1_year_return']}% (1-year)
# - Location: ({input_data['x_coordinate']}, {input_data['y_coordinate']})
# - Property age: {input_data['property_age']} years
# - Area development rating: {input_data['area_dev_rate']}/5
# - Price per square foot: ₹{input_data['square_foot_price']}
# - Facilities rating: {input_data['facilities_rate']}/10

# Always reference the predicted {prediction:.2f}% return when discussing future potential. If the query is unrelated to real estate, politely decline assistance."""

#     chat_messages = [
#         SystemMessage(content=system_message),
#         HumanMessage(content=query)
#     ]
    
#     return llm(chat_messages).content

import pandas as pd
import joblib
import tensorflow as tf
import streamlit as st
from langchain_groq import ChatGroq
from langchain.schema import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from storage import get_session_history
import os
from dotenv import load_dotenv
load_dotenv()

scaler = joblib.load("sscaler.pkl")
ann_model = tf.keras.models.load_model("my_ann_model.h5")
groq_api_key = os.environ("GORQ_API_KEY")
llm = ChatGroq(api_key=groq_api_key, model_name="Llama3-8b-8192")

def invoke_ann(input_data):
    df = pd.DataFrame([input_data])
    scaled_data = scaler.transform(df)
    prediction = ann_model.predict(scaled_data)
    return prediction[0][0]

def combined_model(query, in_data=None):
    in_data = in_data['data'][0];
    if in_data is None:
        input_data = {
            '5_year_return': 105.92,
            '1_year_return': 15.60,
            'x_coordinate': 26.9124,
            'y_coordinate': 75.7873,
            'property_age': 21,
            'area_dev_rate': 2,
            'square_foot_price': 10469,
            'facilities_rate': 4,
        }
    else:
        input_data = {
            '5_year_return': in_data['five_year_return'],
            '1_year_return': in_data['one_year_return'],
            'x_coordinate': in_data['x_coordinate'],
            'y_coordinate': in_data['y_coordinate'],
            'property_age': in_data['property_age'],
            'area_dev_rate': in_data['area_dev_rate'],
            'square_foot_price': in_data['square_foot_price'],
            'facilities_rate': in_data['facilities_rate'],
        }
    
    prediction = invoke_ann(input_data)
    print(f"Predicted return: {prediction}%")
    
    system_message = f"""You are an expert real estate investment advisor with deep knowledge of property markets. Based on our AI analysis, we have calculated that this property's predicted return for next year is {prediction:.2f}%.

Key property metrics:
- Historical returns: {input_data['5_year_return']}% (5-year), {input_data['1_year_return']}% (1-year)
- Location: ({input_data['x_coordinate']}, {input_data['y_coordinate']})
- Property age: {input_data['property_age']} years
- Area development rating: {input_data['area_dev_rate']}/5
- Price per square foot: ₹{input_data['square_foot_price']}
- Facilities rating: {input_data['facilities_rate']}/10

Always reference the predicted {prediction:.2f}% return when discussing future potential. If the query is unrelated to real estate, politely decline assistance."""

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_message),
        MessagesPlaceholder(variable_name="messages"),
    ])
    
    chain = prompt | llm
    with_message_history = RunnableWithMessageHistory(
        chain,
        get_session_history=get_session_history
    )

    try:
        config = {"configurable": {"session_id": "chat1"}}
        response = with_message_history.invoke(
            {"messages": [HumanMessage(content=query)]},
            config=config
        )
        return response.content
    except Exception as e:
        return f"An error occurred: {str(e)}"
    