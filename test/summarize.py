import google.generativeai as genai
api_key = ""
genai.configure(api_key = api_key)

model = genai.GenerativeModel('gemini-1.0-pro-latest')
response = model.generate_content("The opposite of hot is")
print(response.text)

