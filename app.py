from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define your routes and functions here...


@app.route('/meaning', methods=['POST'])
def get_meaning():
    try:
        print('\n Got the req \n')
        data = request.get_json()
        text = data.get('text', '') 
        # Perform your processing here to get the meaning of the text
        meaning = get_meaning_of_text(text)
        return jsonify({'meaning': meaning})
    except Exception as e:
        print(f'Error processing request: {e}')  # Print the error message
        return jsonify({'error': 'An error occurred while processing the request'}), 500

def get_meaning_of_text(text):
    # Example function to get the meaning of the text
    # Replace this with your actual logic to get the meaning
    if text == 'hello':
        return 'A common greeting'
    elif text == 'apple':
        return 'A fruit that grows on trees'
    else:
        return 'Meaning not found'

if __name__ == '__main__':
    app.run(debug=True)
