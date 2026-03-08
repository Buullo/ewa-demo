#!/bin/bash
cd "$(dirname "$0")"
echo "Starting server at http://localhost:8085"
echo "Open: http://localhost:8085/index-standalone.html"
echo "Press Ctrl+C to stop"
python3 -m http.server 8085
