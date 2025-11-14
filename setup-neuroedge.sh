#!/bin/bash
# ============================================
# NeuroEdge-AI-Frontend Termux Setup Script
# ============================================

# 1️⃣ Update Termux & install prerequisites
pkg update -y && pkg upgrade -y
pkg install -y git nodejs

# 2️⃣ Set global Git identity
git config --global user.name "goldedgelabs"
git config --global user.email "goldedgelabs@gmail.com"

# 3️⃣ Clean old node_modules and package-lock
rm -rf node_modules package-lock.json

# 4️⃣ Install dependencies
npm install

# 5️⃣ Ensure CSS folder exists
mkdir -p src/styles
touch src/styles/globals.css
touch src/styles/splashscreen.css

# 6️⃣ Start dev server
npm run dev
