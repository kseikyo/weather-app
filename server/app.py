import requests
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_caching import Cache
from config import *
from constants import *

app = Flask(__name__)
CORS(app)

app.config.from_mapping(cache_config)
cache = Cache(app)


@app.route("/weather/<city_name>")
@cache.cached(timeout=60 * 5)
def get_city_weather_request(city_name):
    if request.method != "GET":
        return make_response(jsonify(error="Method not allowed"), 405)

    if not city_name:
        return make_response(jsonify(error="Missing city_name in request"), 402)

    city_weather = get_city_weather(city_name)
    res, status_code = city_weather[0], city_weather[1]

    json_data = res.get_json()

    return make_response(jsonify(data=json_data), status_code)


def get_city_weather(city_name):
    # call API and convert response into Python dictionary
    url = (
        f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&APPID={API_KEY}"
    )
    response = requests.get(url).json()

    # error like unknown city name, inavalid api key
    if response.get("cod") != 200:
        return (
            jsonify(error="Sorry, We couldn't find the specified city."),
            response.get("cod"),
        )

    description = response.get("weather", {})[0].get("description")
    # get current temperature and convert it into Celsius
    current_temperature = response.get("main", {}).get("temp")
    if current_temperature:
        current_temperature_celsius = round(current_temperature - 273.15, 0)
        data = {
            "city": city_name.title(),
            "temperature": current_temperature_celsius,
            "description": description,
        }

        response = (jsonify(data), response.get("cod"))
        # adding response data to cache
        cached_cities.appendleft(response[0].get_json())

        return response
    else:
        return (
            jsonify(
                error=f"Sorry, We couldn't find any city called {city_name.title()}."
            ),
            response.get("cod"),
        )


@app.route("/weather")
def get_cached_cities_weather():
    if len(cached_cities) == 0:
        return make_response(jsonify(error="No cities found"), 404)

    max_number = request.args.get("max_number")
    if max_number and max_number.isdigit() and int(max_number) <= len(cached_cities):
        max_number = int(max_number)
        cities = [cached_cities[i] for i in range(max_number)]

        response_data = [
            dict(city=city.get("city"), temperature=city.get("temperature"))
            for city in cities
        ]
    else:
        # converting deque data into dictionary to be json serializable
        response_data = [
            dict(city=city.get("city"), temperature=city.get("temperature"))
            for city in cached_cities
        ]
    return make_response(jsonify(data=response_data), 200)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
