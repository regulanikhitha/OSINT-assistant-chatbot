# OSINT-assistant-chatbot
The OSINT Investigation Assistant Chatbot is an AI-powered chatbot designed to help users learn and perform Open Source Intelligence (OSINT) investigations using publicly available information.

Getting started
-
1. Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

2. Provide your Google Generative API key as an environment variable named `GOOGLE_API_KEY`.

PowerShell (current session):

```powershell
$env:GOOGLE_API_KEY = "your_api_key_here"
python app.py
```

Command Prompt (current session):

```cmd
set GOOGLE_API_KEY=your_api_key_here
python app.py
```

3. Open your browser at `http://127.0.0.1:5000`.

Notes:
- The app will log a warning if `GOOGLE_API_KEY` is not set; API calls with fail until configured.
- Do NOT commit your API key into source code.
