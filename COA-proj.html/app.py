from flask import Flask, request, jsonify
from flask_cors import CORS
from cache_simulator import FIFOCache, LRUCache, LFUCache


app = Flask(__name__)
CORS(app)

@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    capacity = data['capacity']
    policy = data['policy']
    access_pattern = data['accessPattern']
    
    if policy == "FIFO":
        cache = FIFOCache(capacity)
    elif policy == "LRU":
        cache = LRUCache(capacity)
    elif policy == "LFU":
        cache = LFUCache(capacity)
    else:
        return jsonify({"error": "Invalid policy"}), 400

    results = []
    for key in access_pattern:
        result = cache.access(key)
        results.append(f"Accessing {key}: {result}")

    return jsonify({"results": results})

@app.route('/',methods=['GET'])
def index():
    return "Cache Simulator API is running!"

if __name__ == "__main__":
    app.run(debug=True)
