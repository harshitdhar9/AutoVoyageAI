# AutoVoyageAI
AutoVoyage AI is an autonomous travel planning agent built with LangChain and open-source LLMs. It reasons over user requests, calls tools to generate optimized itineraries, and simulates booking workflows with recovery and policy checks. Designed as a modular, real-world AI agent project.

## Navigate to backend

```bash
cd backend
```

## Create Virtual Environment (Recommended)

```bash
python -m venv venv
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Create Environment File

Inside `backend/` create a `.env` file:

```bash
touch .env
```

Add your Gemini API key:

```env
GOOGLE_API_KEY=your_api_key_here
```

---

## Start Redis Server

Make sure Redis is installed.

```bash
redis-server
```

---

## Run FastAPI Server

Open a new terminal:

```bash
cd backend
uvicorn app.main:app --reload
```

## Frontend
Open another terminal:

```bash
cd frontend
npm install
npm run dev
```
