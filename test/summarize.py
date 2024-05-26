from groq import Groq

def groq_completion(user_content):
    client = Groq(api_key = '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')
    completion = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=[
            {
                "role": "system",
                "content": "summarize the content with the specified content"
            },
            {
                "role": "user",
                "content": user_content
            }
        ],
        temperature=0.5,
        max_tokens=56400,
        top_p=1,
        stream=True,
        stop=None,
    )


    result = ''
    for chunk in completion:
        result += chunk.choices[0].delta.content or ""
    return result