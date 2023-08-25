import openai

PROMPT = (
    "You are an experienced US lawyer. You will receive a text and you will re-phrase it "
    "so it sounds more formal and using legal jargon."
)


def generate_lawyer_suggestion(initial_text: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": PROMPT},
            {"role": "user", "content": initial_text},
        ],
        temperature=0.5,
    )
    return response.choices[0].message.content  # type: ignore
