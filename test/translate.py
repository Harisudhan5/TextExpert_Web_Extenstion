from googletrans import Translator, constants

translator = Translator()
text = "Hi how are you"
dest_lang = 'es'
translation = translator.translate(text, dest=dest_lang)

print (translation.text)
print(translation.origin)
print(translation.dest)

