#!/bin/bash

echo "🏗️  Construyendo proyecto GymFit para Render..."

# Construir el frontend
echo "📱 Construyendo frontend..."
cd frontend
npm install
npm run build
cd ..

# Verificar que el build se creó correctamente
if [ -d "frontend/build" ]; then
    echo "✅ Frontend construido exitosamente"
else
    echo "❌ Error al construir el frontend"
    exit 1
fi

# Verificar dependencias del backend
echo "🐍 Verificando dependencias del backend..."
cd backend
pip install -r requirements.txt
cd ..

echo "🎉 Proyecto listo para deployment en Render!"
echo ""
echo "📋 Pasos para deployment:"
echo "1. Sube tu código a GitHub"
echo "2. Conecta tu repo a Render"
echo "3. Crea un Web Service para el backend"
echo "4. Crea un Static Site para el frontend"
echo "5. ¡Disfruta tu sitio web en vivo!"
