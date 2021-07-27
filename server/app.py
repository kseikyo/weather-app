import requests
from flask import Flask, request
from flask_caching import Cache
from dotenv import dotenv_values

dotenvConfig = dotenv_values(".env")
# If there is no key in the .env file, then use an empty string
WEATHER_KEY = dotenvConfig.get("WEATHER_KEY") or ""

cacheConfig = {
    "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 60*5,  # 5 minutes of default timeout for Flask-Caching
}


app = Flask(__name__)

app.config.from_mapping(cacheConfig)
cache = Cache(app)

@app.route('/city')
@cache.cached(timeout=60*5)
def search_city():
    if request.method != "GET":
        return "Method not allowed", 405

    if "q" not in request.args:
        return "Missing 'q' argument", 400

    API_KEY = WEATHER_KEY  # initialize your key here
    city = request.args.get('q')  # city name passed as argument

    # call API and convert response into Python dictionary
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&APPID={API_KEY}'
    response = requests.get(url).json()

    # error like unknown city name, inavalid api key
    if response.get('cod') != 200:
        return "Sorry, We couldn't find the specified city."
        # message = response.get('message', '')
        # return f'Error getting temperature for {city.title()}. Error message = {message}'

    # get current temperature and convert it into Celsius
    current_temperature = response.get('main', {}).get('temp')
    if current_temperature:
        current_temperature_celsius = round(current_temperature - 273.15, 2)
        return f'Current temperature of {city.title()} is {current_temperature_celsius} &#8451;'
    else:
        return f'Error getting temperature for {city.title()}'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
