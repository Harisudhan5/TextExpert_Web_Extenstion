from flask import Flask, request, jsonify
from googletrans import Translator

translator = Translator()

app = Flask(__name__)

@app.route('/meaning', methods=['POST'])
def meaning():
    data = request.get_json()
    text = data.get('text')
    language = data.get('language')  # Get the selected language
    # Process text to get meaning
    result = f"Meaning of '{text}' in {language}"
    return jsonify({'result': result})

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text')
    language = data.get('language')
    translation = translator.translate(text, dest=language)
    result = f"""Selected Text : '{text}'
            Selected Language : {language} 
            Translation : {translation.text}"""
    return jsonify({'result': result})

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text')
    language = data.get('language')  # Get the selected language
    # Process text to summarize
    result = f"Summary of '{text}' in {language}"
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
