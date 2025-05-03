from collections import deque, defaultdict

# FIFO Cache Simulator
class FIFOCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = deque()
        self.cache_set = set()
    
    def access(self, key):
        if key in self.cache_set:
            return "Cache hit"
        if len(self.cache) == self.capacity:
            evicted = self.cache.popleft()
            self.cache_set.remove(evicted)
        self.cache.append(key)
        self.cache_set.add(key)
        return "Cache miss"


# LRU Cache Simulator
class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.order = deque()

    def access(self, key):
        if key in self.cache:
            self.order.remove(key)
            self.order.append(key)
            return "Cache hit"
        if len(self.cache) == self.capacity:
            evicted = self.order.popleft()
            del self.cache[evicted]
        self.cache[key] = True
        self.order.append(key)
        return "Cache miss"


# LFU Cache Simulator
class LFUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.freq = defaultdict(int)
        self.min_freq = 0

    def access(self, key):
        if key in self.cache:
            self.freq[key] += 1
            return "Cache hit"
        if len(self.cache) == self.capacity:
            evicted = min(self.cache, key=lambda k: self.freq[k])
            del self.cache[evicted]
            del self.freq[evicted]
        self.cache[key] = True
        self.freq[key] = 1
        self.min_freq = min(self.freq.values())
        return "Cache miss"
