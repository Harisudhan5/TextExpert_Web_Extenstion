# TextMaster

**TextMaster** is a powerful browser extension designed to enhance your reading and comprehension experience on the web. With TextMaster, you can easily get the meaning, summarize, translate, and detect the language of any selected text on a webpage.

## Features

- **Meaning**: Quickly get definitions and explanations of selected words or phrases.
- **Summarize**: Generate concise summaries of selected text to understand the key points.
- **Translate**: Translate selected text into your preferred language.
- **Detect Language**: Identify the language of the selected text.


## Usage

1. Highlight any text on a webpage.
2. Select one of the four options: **Meaning**, **Summarize**, **Translate**, or **Detect Language**.
3. View the results in a popup window.


### Tech Stack 

- JavaScript
- Python 
- Googletrans
- Googlegenai

### Installation

Clone the repository:

```bash
git clone https://github.com/Harisudhan5TextExpert_Web_Extenstion.git
cd TextMaster
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

### Load Extension

1. Open your browser and navigate to `chrome://extensions/` (for Chrome) or `about:debugging#/runtime/this-firefox` (for Firefox).
2. Enable "Developer mode" (for Chrome) or "Load Temporary Add-on" (for Firefox).
3. Click "Load unpacked" and select the directory.

Run the backend Flask

```bash
python app.py
```

## License

This project is licensed under the Apache2.0 License - see the [LICENSE](LICENSE) file for details.


