import requests
from flask import Flask, request, jsonify, make_response
from flask_caching import Cache
from dotenv import dotenv_values

dotenvConfig = dotenv_values(".env")
# If there is no key in the .env file, then use an empty string
API_KEY = dotenvConfig.get("API_KEY") or ""

cacheConfig = {
    "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 60 * 5,  # 5 minutes of default timeout for Flask-Caching
}

app = Flask(__name__)

app.config.from_mapping(cacheConfig)
cache = Cache(app)


@app.route("/city/<city>")
@cache.cached(timeout=60 * 5)
def search_city(city):
    if request.method != "GET":
        return make_response(jsonify(error="Method not allowed"), 405)

    if city != request.view_args["city"]:
        return make_response(jsonify(error="Missing city in request"), 402)

    # call API and convert response into Python dictionary
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&APPID={API_KEY}"
    response = requests.get(url).json()

    # error like unknown city name, inavalid api key
    if response.get("cod") != 200:
        return make_response(
            jsonify(error="Sorry, We couldn't find the specified city."),
            response.get("cod"),
        )

    # get current temperature and convert it into Celsius
    current_temperature = response.get("main", {}).get("temp")
    if current_temperature:
        current_temperature_celsius = round(current_temperature - 273.15, 2)
        data = {"city": city.title(), "temperature": current_temperature_celsius}
        return make_response(jsonify(data), response.get("cod"))
    else:
        return make_response(
            jsonify(error=f"Sorry, We couldn't find any city called {city.tile()}."),
            response.get("cod"),
        )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
