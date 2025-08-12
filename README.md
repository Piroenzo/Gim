# 🏋️‍♂️ GymFit - Portal Web del Gimnasio

Una aplicación web moderna y completa para gimnasio desarrollada con React y Python.

## 🚀 Características

- **Frontend React**: Interfaz moderna y responsiva
- **Backend Python**: API REST con FastAPI
- **Diseño Atractivo**: UI/UX profesional con imágenes de alta calidad
- **Secciones Completas**: Quiénes somos, horarios, planes, ubicación, contacto
- **Formulario de Contacto**: Sistema de comunicación integrado
- **Frases Motivadoras**: Inspiración para los usuarios

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 18
- CSS3 con animaciones
- Responsive Design
- Componentes modulares

### Backend
- Python 3.11+
- FastAPI
- SQLite (base de datos)
- Pydantic (validación de datos)

## 📁 Estructura del Proyecto

```
gim/
├── frontend/          # Aplicación React
├── backend/           # API Python FastAPI
├── images/            # Imágenes del gimnasio
└── README.md
```

## 🚀 Instalación y Uso

### Desarrollo Local

#### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

### 🚀 Deployment en Render

#### 1. Backend (FastAPI)
1. Conecta tu repositorio de GitHub a Render
2. Crea un nuevo **Web Service**
3. Selecciona tu repositorio
4. Configuración automática:
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3.11

#### 2. Frontend (React)
1. Crea un nuevo **Static Site**
2. Selecciona tu repositorio
3. Configuración:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Environment Variable**: `REACT_APP_API_URL` = URL de tu backend

#### 3. URLs de Producción
- **Backend**: `https://tu-backend.onrender.com`
- **Frontend**: `https://tu-frontend.onrender.com`

## 🌟 Funcionalidades

- ✅ Página de inicio con hero section
- ✅ Sección "Quiénes Somos"
- ✅ Horarios de clases
- ✅ Planes y precios
- ✅ Ubicación y mapa
- ✅ Formulario de contacto
- ✅ Diseño responsivo
- ✅ Frases motivadoras

## 📱 Diseño Responsivo

La aplicación se adapta perfectamente a todos los dispositivos:
- Desktop
- Tablet
- Mobile

## 🎨 Paleta de Colores

- **Primario**: #FF6B35 (Naranja vibrante)
- **Secundario**: #2C3E50 (Azul oscuro)
- **Acento**: #E74C3C (Rojo)
- **Neutro**: #ECF0F1 (Gris claro)
- **Texto**: #2C3E50 (Azul oscuro)

---

Desarrollado con ❤️ para tu portafolio
