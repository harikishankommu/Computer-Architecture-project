function simulateCache() {
    // Get input values from the form fields
    const capacity = Number(document.getElementById("capacity").value);
    const policy = document.getElementById("policy").value;
    const accessPattern = document.getElementById("input").value.split(',');

    // Validate input
    if (!capacity || !accessPattern.length) {
        alert("Please provide valid inputs.");
        return; // Stop execution if input is invalid
    }

    // Results for all policies
    let fifoResult = fifoCache(capacity, accessPattern);
    let lruResult = lruCache(capacity, accessPattern);
    let lfuResult = lfuCache(capacity, accessPattern);

    // Get the output div
    const output = document.getElementById("output");

    // Clear any previous output
    output.textContent = "";

    // If user selects "All", display results for all policies
    if (policy === "All") {
        // FIFO Policy Result
        output.textContent += `FIFO Policy Result:\nHits: ${fifoResult.hits}, Misses: ${fifoResult.misses}, Final Cache: ${JSON.stringify(fifoResult.final_cache)}\nExplanation:\n`;
        fifoResult.explanation.forEach(expl => output.textContent += expl + '\n');
        output.textContent += '\n';

        // LRU Policy Result
        output.textContent += `LRU Policy Result:\nHits: ${lruResult.hits}, Misses: ${lruResult.misses}, Final Cache: ${JSON.stringify(lruResult.final_cache)}\nExplanation:\n`;
        lruResult.explanation.forEach(expl => output.textContent += expl + '\n');
        output.textContent += '\n';

        // LFU Policy Result
        output.textContent += `LFU Policy Result:\nHits: ${lfuResult.hits}, Misses: ${lfuResult.misses}, Final Cache: ${JSON.stringify(lfuResult.final_cache)}\nExplanation:\n`;
        lfuResult.explanation.forEach(expl => output.textContent += expl + '\n');
    } 
    // If user selects FIFO, display only FIFO result
    else if (policy === "FIFO") {
        output.textContent += `FIFO Policy Result:\nHits: ${fifoResult.hits}, Misses: ${fifoResult.misses}, Final Cache: ${JSON.stringify(fifoResult.final_cache)}\nExplanation:\n`;
        fifoResult.explanation.forEach(expl => output.textContent += expl + '\n');
    } 
    // If user selects LRU, display only LRU result
    else if (policy === "LRU") {
        output.textContent += `LRU Policy Result:\nHits: ${lruResult.hits}, Misses: ${lruResult.misses}, Final Cache: ${JSON.stringify(lruResult.final_cache)}\nExplanation:\n`;
        lruResult.explanation.forEach(expl => output.textContent += expl + '\n');
    } 
    // If user selects LFU, display only LFU result
    else if (policy === "LFU") {
        output.textContent += `LFU Policy Result:\nHits: ${lfuResult.hits}, Misses: ${lfuResult.misses}, Final Cache: ${JSON.stringify(lfuResult.final_cache)}\nExplanation:\n`;
        lfuResult.explanation.forEach(expl => output.textContent += expl + '\n');
    }
}

function fifoCache(capacity, accessPattern) {
    let cache = [];
    let hits = 0;
    let misses = 0;
    let explanation = [];
    
    accessPattern.forEach(item => {
        if (cache.includes(item)) {
            hits++;
            explanation.push(`Hit: ${item} is already in the cache.`);
        } else {
            if (cache.length >= capacity) {
                let evicted = cache.shift(); // Remove the first (oldest) item
                explanation.push(`Evict: ${evicted} removed to make space.`);
            }
            cache.push(item); // Add new item to cache
            misses++;
            explanation.push(`Miss: ${item} added to the cache.`);
        }
    });

    return {
        hits,
        misses,
        final_cache: cache,
        explanation
    };
}

function lruCache(capacity, accessPattern) {
    let cache = [];
    let hits = 0;
    let misses = 0;
    let explanation = [];

    accessPattern.forEach(item => {
        if (cache.includes(item)) {
            cache.splice(cache.indexOf(item), 1); 
            cache.unshift(item);
            hits++;
            explanation.push(`Hit: ${item} is moved to the front (most recently used).`);
        } else {
            if (cache.length >= capacity) {
                let evicted = cache.pop(); // Remove the least recently used item
                explanation.push(`Evict: ${evicted} removed as it was least recently used.`);
            }
            cache.unshift(item); // Add new item to the front (most recently used)
            misses++;
            explanation.push(`Miss: ${item} added to the cache.`);
        }
    });

    return {
        hits,
        misses,
        final_cache: cache,
        explanation
    };
}

function lfuCache(capacity, accessPattern) {
    let cache = [];
    let frequency = {}; // Track the frequency of each item
    let hits = 0;
    let misses = 0;
    let explanation = [];

    accessPattern.forEach(item => {
        if (cache.includes(item)) {
            frequency[item]++; // Increment access count
            hits++;
            explanation.push(`Hit: ${item} frequency increased.`);
        } else {
            if (cache.length >= capacity) {
                let leastFrequentItem = Object.keys(frequency).reduce((a, b) => frequency[a] < frequency[b] ? a : b);
                cache.splice(cache.indexOf(leastFrequentItem), 1); // Remove least frequently used item
                delete frequency[leastFrequentItem];
                explanation.push(`Evict: ${leastFrequentItem} removed due to low frequency.`);
            }
            cache.push(item); // Add new item to the cache
            frequency[item] = 1; // Initialize its frequency
            misses++;
            explanation.push(`Miss: ${item} added to the cache.`);
        }
    });

    return {
        hits,
        misses,
        final_cache: cache,
        explanation
    };
}
