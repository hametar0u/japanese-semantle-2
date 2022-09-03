Sup yall welcome to a second-degree ripoff of wordle

## Directory structure:
backend/ // Django backend
  api/
    models.py // db object-model thingy definitions
    urls.py // api endpoint urls
    views.py // api endpoint methods
  japanese_semantle/
    settings.py // backend configurations
frontend/ // react frontend
  build/ // production build
  src/ // react code
    pages/
      HomePage.jsx
    components/
    
  tailwind.config.js // tailwind configurations


## How to run the app (locally)
Backend:
1. cd backend (from root dir)
2. pipenv shell
3. pip install -r requirements.txt
4. python manage.py runserver

Frontend:
1. cd frontend (from root dir)
2. npm i
3. npm start

## Explanation of important dependencies
Backend:
asgiref
beautifulsoup4 // web scraping (oh wait ig you don't need this anymore)
certifi
chardet
charset-normalizer
dj-database-url
Django
django-cors-headers //deal with cors
djangorestframework //to use Django as a REST api
gunicorn //tbh can remove???
hnswlib
idna
numpy //processing data
psycopg2 //postgres dependency
py4j
pyspark //to use pretrained embedding network to generate embeddings
python-dotenv // for local env
pytz
requests
sortedcontainers
soupsieve
spark-nlp //to be installed w/ pyspark
sqlparse
tqdm //for dev; progress bar
urllib3
whitenoise


Frontend:
"axios" //to call backend endpoints
"framer-motion" //animate components
"react-animated-text-content" //animate text
"react-confetti"
"react-countup" //animate numbers
"react-router-dom" //fronter routing