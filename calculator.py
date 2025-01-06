from flask import Flask, request, jsonify
from flask_cors import CORS
import operator

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Operation mappings
operations = {
    "+": operator.add,
    "-": operator.sub,
    "*": operator.mul,
    "/": operator.truediv
}

@app.route('/calculate', methods=['GET'])
def calculate():
    try:
        # Get the full equation string
        equation = request.args.get('equation')

        # Basic validation of the equation format (num1 operator num2)
        if equation:
            # Split the equation into parts: e.g., "1+2"
            for op in operations:
                if op in equation:
                    num1, num2 = equation.split(op)
                    num1, num2 = float(num1), float(num2)
                    result = operations[op](num1, num2)
                    return jsonify({'result': result})
        
        return jsonify({'error': 'Invalid equation format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=2000)
