#!/bin/bash

echo "🚀 Starting Forecasting 2.0 Demo..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3 HTTP server"
    echo "📊 Demo will be available at: http://localhost:3000"
    echo "🔄 Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 3000
elif command -v node &> /dev/null; then
    echo "✅ Using Node.js server"
    echo "📊 Demo will be available at: http://localhost:3000"
    echo "🔄 Press Ctrl+C to stop the server"
    echo ""
    node server.js
else
    echo "❌ Neither Python 3 nor Node.js found"
    echo "💡 Please install Python 3 or Node.js to run the demo"
    echo "💡 Or simply open index.html in your browser"
    exit 1
fi


