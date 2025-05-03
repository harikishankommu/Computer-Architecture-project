def fifo_cache(capacity, access_pattern):
    cache = []
    hits = 0
    misses = 0
    explanation = []

    for item in access_pattern:
        if item in cache:
            hits += 1
            explanation.append(f"Hit: {item} is already in the cache.")
        else:
            if len(cache) >= capacity:
                evicted = cache.pop(0)  # Remove the oldest item (FIFO)
                explanation.append(f"Evict: {evicted} removed to make space.")
            cache.append(item)
            misses += 1
            explanation.append(f"Miss: {item} added to the cache.")

    return {
        "hits": hits,
        "misses": misses,
        "final_cache": cache,
        "explanation": explanation
    }


def lru_cache(capacity, access_pattern):
    cache = []
    hits = 0
    misses = 0
    explanation = []

    for item in access_pattern:
        if item in cache:
            cache.remove(item)
            cache.insert(0, item)
            hits += 1
            explanation.append(f"Hit: {item} is moved to the front (most recently used).")
        else:
            if len(cache) >= capacity:
                evicted = cache.pop()
                explanation.append(f"Evict: {evicted} removed as it was least recently used.")
            cache.insert(0, item)
            misses += 1
            explanation.append(f"Miss: {item} added to the cache.")

    return {
        "hits": hits,
        "misses": misses,
        "final_cache": cache,
        "explanation": explanation
    }


def lfu_cache(capacity, access_pattern):
    cache = []
    frequency = {}
    hits = 0
    misses = 0
    explanation = []

    for item in access_pattern:
        if item in cache:
            frequency[item] += 1
            hits += 1
            explanation.append(f"Hit: {item} frequency increased.")
        else:
            if len(cache) >= capacity:
                # Find least frequently used item
                least_freq = min(frequency.values())
                candidates = [x for x in cache if frequency[x] == least_freq]
                to_evict = candidates[0]  # Tie-breaker: first in cache
                cache.remove(to_evict)
                del frequency[to_evict]
                explanation.append(f"Evict: {to_evict} removed due to low frequency.")
            cache.append(item)
            frequency[item] = 1
            misses += 1
            explanation.append(f"Miss: {item} added to the cache.")

    return {
        "hits": hits,
        "misses": misses,
        "final_cache": cache,
        "explanation": explanation
    }


def simulate_cache(capacity, policy, access_pattern):
    """
    Simulates cache replacement policies based on input.
    
    Args:
        capacity (int): Max size of the cache.
        policy (str): 'FIFO', 'LRU', 'LFU', or 'All'.
        access_pattern (list of str): Sequence of memory/page accesses.

    Returns:
        dict: Results with hits, misses, final cache, and explanation.
    """
    if not capacity or not access_pattern:
        return {"error": "Invalid input: Capacity and access pattern are required."}

    results = {}

    if policy == "All":
        results["FIFO"] = fifo_cache(capacity, access_pattern)
        results["LRU"] = lru_cache(capacity, access_pattern)
        results["LFU"] = lfu_cache(capacity, access_pattern)
    elif policy == "FIFO":
        results["FIFO"] = fifo_cache(capacity, access_pattern)
    elif policy == "LRU":
        results["LRU"] = lru_cache(capacity, access_pattern)
    elif policy == "LFU":
        results["LFU"] = lfu_cache(capacity, access_pattern)
    else:
        results["error"] = "Invalid policy selected."

    return results


# Interactive mode
if __name__ == "__main__":
    try:
        capacity = int(input("Enter cache capacity: "))
        policy = input("Choose policy (FIFO, LRU, LFU, All): ").strip().upper()
        raw_input = input("Enter access pattern (comma separated): ").strip()
        access_pattern = [item.strip() for item in raw_input.split(',') if item.strip()]

        result = simulate_cache(capacity, policy, access_pattern)

        for policy_name, data in result.items():
            print(f"\n--- {policy_name} Policy ---")
            print(f"Hits: {data['hits']}, Misses: {data['misses']}")
            print(f"Final Cache: {data['final_cache']}")
            print("Explanation:")
            for line in data["explanation"]:
                print("  " + line)

    except Exception as e:
        print("Error:", e)