from flask import Flask, request, render_template, Response, stream_with_context
from openai import OpenAI

app = Flask(__name__)

client = OpenAI(
    api_key="sk-a0ce0e07ce9741d3a3021854128bd40d",
    base_url="https://api.deepseek.com/v1"
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_response', methods=['GET'])
def get_response():
    user_input = request.args.get('user_input', '')  # 从查询参数获取输入

    def generate():
        completion = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input},
            ],
            stream=True
        )
        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                yield f"data: {chunk.choices[0].delta.content}\n\n"

    u = Response(stream_with_context(generate()), mimetype='text/event-stream')
    print(u)
    return u


if __name__ == '__main__':
    app.run(debug=True)
