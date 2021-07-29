from collections import deque

# TODO: Use redis cache
cached_cities = deque(maxlen=5)