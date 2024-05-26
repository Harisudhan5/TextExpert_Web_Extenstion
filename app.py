from flask import Flask, request, jsonify
from googletrans import Translator
import google.generativeai as genai

api_key = "Enter your api key"
translator = Translator()
genai.configure(api_key = api_key)
model = genai.GenerativeModel('gemini-1.0-pro-latest')

code_languages = {
    "af": "Afrikaans",
    "sq": "Albanian",
    "am": "Amharic",
    "ar": "Arabic",
    "hy": "Armenian",
    "az": "Azerbaijani",
    "eu": "Basque",
    "be": "Belarusian",
    "bn": "Bengali",
    "bs": "Bosnian",
    "bg": "Bulgarian",
    "ca": "Catalan",
    "ceb": "Cebuano",
    "ny": "Chichewa",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    "co": "Corsican",
    "hr": "Croatian",
    "cs": "Czech",
    "da": "Danish",
    "nl": "Dutch",
    "en": "English",
    "eo": "Esperanto",
    "et": "Estonian",
    "tl": "Filipino",
    "fi": "Finnish",
    "fr": "French",
    "fy": "Frisian",
    "gl": "Galician",
    "ka": "Georgian",
    "de": "German",
    "el": "Greek",
    "gu": "Gujarati",
    "ht": "Haitian Creole",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "he": "Hebrew",
    "hi": "Hindi",
    "hmn": "Hmong",
    "hu": "Hungarian",
    "is": "Icelandic",
    "ig": "Igbo",
    "id": "Indonesian",
    "ga": "Irish",
    "it": "Italian",
    "ja": "Japanese",
    "jw": "Javanese",
    "kn": "Kannada",
    "kk": "Kazakh",
    "km": "Khmer",
    "rw": "Kinyarwanda",
    "ko": "Korean",
    "ku": "Kurdish (Kurmanji)",
    "ky": "Kyrgyz",
    "lo": "Lao",
    "la": "Latin",
    "lv": "Latvian",
    "lt": "Lithuanian",
    "lb": "Luxembourgish",
    "mk": "Macedonian",
    "mg": "Malagasy",
    "ms": "Malay",
    "ml": "Malayalam",
    "mt": "Maltese",
    "mi": "Maori",
    "mr": "Marathi",
    "mn": "Mongolian",
    "my": "Myanmar (Burmese)",
    "ne": "Nepali",
    "no": "Norwegian",
    "or": "Odia (Oriya)",
    "ps": "Pashto",
    "fa": "Persian",
    "pl": "Polish",
    "pt": "Portuguese",
    "pa": "Punjabi",
    "ro": "Romanian",
    "ru": "Russian",
    "sm": "Samoan",
    "gd": "Scots Gaelic",
    "sr": "Serbian",
    "st": "Sesotho",
    "sn": "Shona",
    "sd": "Sindhi",
    "si": "Sinhala",
    "sk": "Slovak",
    "sl": "Slovenian",
    "so": "Somali",
    "es": "Spanish",
    "su": "Sundanese",
    "sw": "Swahili",
    "sv": "Swedish",
    "tg": "Tajik",
    "ta": "Tamil",
    "tt": "Tatar",
    "te": "Telugu",
    "th": "Thai",
    "tr": "Turkish",
    "tk": "Turkmen",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "ug": "Uyghur",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "cy": "Welsh",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zu": "Zulu"
}


app = Flask(__name__)

@app.route('/meaning', methods=['POST'])
def meaning():
    data = request.get_json()
    text = data.get('text')
    language = data.get('language')  # Get the selected language
    # Process text to get meaning
    prompt = "Return the meaning for the following : " + str(text)
    try:
        response = model.generate_content(prompt).text
    except:
        response = "An error occured in the API call"
    result = f"""Selected Text : {text} \n
            Selected Language : {language} \n
            Meaning : {response}"""
    return jsonify({'result': result})

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('text')
    language = data.get('language')
    try:
        translation = translator.translate(text, dest=language).text
    except:
        translation = "An error occured in translation"
    result = f"""Selected Text : '{text}'
            Selected Language : {language} 
            Translation : {translation}"""
    return jsonify({'result': result})

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text')
    language = data.get('language')  # Get the selected language
    # Process text to summarize
    prompt = "Summarize the following :" + str(text) 
    try:
        response = model.generate_content(prompt).text
    except:
        response = "An error occured in API call"
    result = f"""Selected Text : {text} \n 
    Selected Language : {language}
    Summary : {response}"""
    return jsonify({'result': result})

@app.route('/detect_language', methods=['POST'])
def detect_language():
    data = request.get_json()
    text = data.get('text')
    try:
        detected = translator.detect(text)
        result = detected.lang
    except:
        result = "Error"
    if result in code_languages:
        res = code_languages[result]
    else:
        res = "Unknown language"
    response = f"""Detected Language : {res}"""
    return jsonify({'result': response})

if __name__ == '__main__':
    app.run(debug=True)
