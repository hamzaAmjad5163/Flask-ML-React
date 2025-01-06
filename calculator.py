from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/calculate', methods=['GET'])
def calculate():
    try:
        equation = request.args.get('equation')
        print(f"Received equation: {equation}")

        if equation:
            cleaned_equation = re.sub(r'(\d+)%(\d+)', r'(\1 * \2 / 100)', equation)
            cleaned_equation = re.sub(r'(\d+)%', r'(\1 / 100)', cleaned_equation)
            print(f"Cleaned equation: {cleaned_equation}")
            
            result = eval(cleaned_equation)
            return jsonify({'result': result})

        return jsonify({'error': 'Invalid equation format'}), 400
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=2000)
