import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

CSV_FILE_PATH = 'C:/xampp/htdocs/react-app/one/imdb_top_1000.csv'

df = pd.read_csv(CSV_FILE_PATH)

@app.route('/', methods=['GET'])
def home():
    return "Hello, Flask is running!"

@app.route('/imdb', methods=['GET'])
def get_survey_data():
    genres = {}

    for _, row in df.iterrows():
        genre_list = row.get("Genre", None)
        if pd.notna(genre_list):  
            genre_split = genre_list.split(", ")  
            for genre in genre_split:
                genres[genre] = genres.get(genre, 0) + 1

    chart_data = {
        "categories": list(genres.keys()),
        "counts": list(genres.values())
    }

    return jsonify(chart_data)

if __name__ == '__main__':
    app.run(debug=True, port=2005)
