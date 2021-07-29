from dotenv import dotenv_values

dotenvConfig = dotenv_values(".env")

# If there is no key in the .env file, then use an empty string
API_KEY = dotenvConfig.get("API_KEY") or ""

cacheConfig = {
    "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 60 * 5,  # 5 minutes of default timeout for Flask-Caching
}
