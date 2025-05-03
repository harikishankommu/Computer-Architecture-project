# Cache Replacement Simulator

A web-based simulator that demonstrates and compares three fundamental cache replacement policies: FIFO, LRU, and LFU.

## Features

- **Interactive Web Interface**: User-friendly GUI for simulating cache behavior
- **Multiple Policies**: Supports FIFO, LRU, and LFU replacement algorithms
- **Detailed Analysis**: Provides hit/miss statistics and step-by-step explanations
- **Comparative Mode**: Option to run all three policies simultaneously
- **Responsive Design**: Works on both desktop and mobile devices

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Python with Flask
- **Styling**: Custom CSS with Google Fonts

## Project Structure

```
cache-simulator/
├── app.py                # Flask backend server
├── cache_simulator.py    # Core cache algorithms
├── index.html            # Main interface
├── script.js             # Frontend logic (API version)
├── script1.js            # Frontend logic (standalone version)
├── script1.py            # Python version of algorithms
├── sheet.css             # Stylesheet
└── settings.json         # VS Code configuration
```

## Installation & Usage

### Option 1: Standalone (Frontend Only)
1. Simply open `index.html` in a web browser
2. No server required - uses the JavaScript implementation in `script1.js`

### Option 2: Full Stack (Frontend + Backend)
1. Install Python dependencies:
   ```bash
   pip install flask flask-cors
   ```
2. Start the Flask server:
   ```bash
   python app.py
   ```
3. Open `index.html` in a browser (served on port 5000)

## API Endpoints

- `POST /simulate`
  - Parameters: `capacity`, `policy`, `accessPattern`
  - Returns: Simulation results with hit/miss details

## Cache Policies Implemented

### 1. FIFO (First-In-First-Out)
- **Mechanism**: Evicts the oldest item in cache
- **Complexity**: O(1) for both access and eviction
- **Best For**: Simple systems with sequential access patterns

### 2. LRU (Least Recently Used)
- **Mechanism**: Evicts the least recently accessed item
- **Complexity**: O(n) for tracking recency (optimizable to O(1))
- **Best For**: General purpose systems with temporal locality

### 3. LFU (Least Frequently Used)
- **Mechanism**: Evicts the least frequently accessed item
- **Complexity**: O(n) for frequency tracking
- **Best For**: Workloads with stable access patterns

## Sample Input

```
Cache Capacity: 3
Policy: All
Access Pattern: 1, 2, 3, 1, 4, 5, 2, 1
```

## Sample Output

```
FIFO Policy Result:
Hits: 2, Misses: 6
Final Cache: ["5", "2", "1"]
Explanation:
Miss: 1 added to the cache.
Miss: 2 added to the cache.
...

LRU Policy Result:
Hits: 3, Misses: 5
Final Cache: ["1", "2", "5"]
Explanation:
Hit: 1 is moved to the front...
...

LFU Policy Result:
Hits: 2, Misses: 6
Final Cache: ["1", "2", "5"]
Explanation:
Hit: 1 frequency increased...
...
```

## Customization

1. **Visual Style**: Modify `sheet.css` to change colors, layout, etc.
2. **Algorithms**: Edit `cache_simulator.py` or `script1.js` to tweak policies
3. **Port Configuration**: Adjust in `settings.json` (for Live Server) or `app.py`

## Contributors

- Group - 06
- K. Hari Kishan - 2301MC12
- K. Maneesh Kumar Reddy - 2301MC16
- R. Gnanesh - 2301MC07
- G. Sai Charan - 2301MC25
- P. Sai Bhargav - 2301MC24

## License

MIT License - See [LICENSE](LICENSE) for details.

---
