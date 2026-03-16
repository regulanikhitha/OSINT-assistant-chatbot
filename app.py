from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

genai.configure(api_key="AIzaSyA9C0ooLJBUOjYCokv-BkQfBPI9JlY-aFc")

model = genai.GenerativeModel("gemini-2.5-flash")

# OSINT System Prompt
SYSTEM_PROMPT = """
You are an OSINT (Open Source Intelligence) Investigation Assistant.

Your job is to help users learn how to investigate information using public sources.

You can explain topics like:
- Person investigation
- Domain investigation
- Email investigation
- Image reverse search
- Social media investigation
- Geolocation investigation
- OSINT tools and techniques

Rules:
1. Only answer questions related to OSINT.
2. If a question is outside OSINT, politely say:
   "I am an OSINT Investigation Assistant and can only help with OSINT related topics."
3. Provide step-by-step investigation guidance.
4. Suggest OSINT tools when relevant.
5. Responses should be clear and educational.
"""

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    try:
        prompt = SYSTEM_PROMPT + "\nUser Question: " + user_message
        response = model.generate_content(prompt)

        return jsonify({"reply": response.text})

    except Exception as e:
        app.logger.exception("Error generating response")
        return jsonify({"error": "Failed to generate response", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
