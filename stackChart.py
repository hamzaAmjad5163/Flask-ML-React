import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

CSV_FILE_PATH = 'C:/xampp/htdocs/react-app/one/2016_StackOverflow_Survey_Responses.csv'

df = pd.read_csv(CSV_FILE_PATH)

@app.route('/', methods=['GET'])
def home():
    return "Hello, Flask is running!"

@app.route('/data', methods=['GET'])
def get_survey_data():
    languages = {}

    for _, row in df.iterrows():
        language = row.get("tech_do", None)  
        if pd.notna(language):  
            langs = language.split(";")
            for lang in langs:
                languages[lang] = languages.get(lang, 0) + 1

    chart_data = {
        "categories": list(languages.keys()),
        "counts": list(languages.values())
    }

    return jsonify(chart_data)

if __name__ == '__main__':
    app.run(debug=True, port=2020)
