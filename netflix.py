import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins for simplicity

# Define the path to the CSV file
CSV_FILE_PATH = 'C:/xampp/htdocs/react-app/one/netflix.csv'

# Read the CSV file into a DataFrame
df = pd.read_csv(CSV_FILE_PATH)

@app.route('/', methods=['GET'])
def home():
    return "Hello, Flask is running!"

@app.route('/netflix', methods=['GET'])
def get_survey_data():
    types = {}

    for _, row in df.iterrows():
        media_type = row.get("type", None)
        if pd.notna(media_type):
            types[media_type] = types.get(media_type, 0) + 1

    chart_data = {
        "categories": list(types.keys()),
        "counts": list(types.values())
    }

    return jsonify(chart_data)

if __name__ == '__main__':
    app.run(debug=True, port=2010)
