import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def dummy_virus_scan(file_path):
    infected = random.choice([True, False]) 
    if infected:
        virus_percentage = random.randint(30, 100)
        return f"Virus detected in file {file_path}! Infection level: {virus_percentage}%"
    else:
        return None  

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        print("Received request to upload file")

        if 'file' not in request.files:
            raise ValueError("No file part")

        file = request.files['file']

        if file.filename == '':
            raise ValueError("No selected file")

        if not allowed_file(file.filename):
            raise ValueError(f"File type not allowed: {file.filename}")

        print(f"Uploading file: {file.filename}")

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        scan_result = dummy_virus_scan(file_path)
        print(f"Scan result: {scan_result}")

        if scan_result is None:
            return jsonify({"status": "success", "message": f"File {filename} uploaded and scanned successfully! No viruses detected."})
        else:
            return jsonify({"status": "error", "message": scan_result}), 400

    except Exception as e:
        print(f"Error: {str(e)}") 
        return jsonify({"status": "error", "message": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
