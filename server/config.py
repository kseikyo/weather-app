from dotenv import dotenv_values

dotenv_config = dotenv_values(".env")

# If there is no key in the .env file, then use an empty string
API_KEY = dotenv_config.get("API_KEY") or ""

cache_config = {
    "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 60 * 5,  # 5 minutes of default timeout for Flask-Caching
}
