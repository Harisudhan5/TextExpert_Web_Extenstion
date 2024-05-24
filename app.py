from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/meaning', methods=['POST','GET'])
def get_meaning():
    data = request.get_json()
    selected_text = data.get('text', '')
    # Perform your logic to find the meaning of the selected text here
    meaning = "Found meaning"+str(selected_text)
    return jsonify({'meaning': meaning})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
