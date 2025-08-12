from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import json
from datetime import datetime
import os

app = FastAPI(
    title="GymFit API",
    description="API para el portal web del gimnasio",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://gymfit-frontend.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# Modelos Pydantic
class ContactForm(BaseModel):
    name: str
    email: str
    phone: str
    message: str

class ClassSchedule(BaseModel):
    id: int
    class_name: str
    instructor: str
    time: str
    day: str
    duration: str

class MembershipPlan(BaseModel):
    id: int
    name: str
    price: float
    description: str
    features: List[str]

# Base de datos SQLite
def init_db():
    conn = sqlite3.connect('gymfit.db')
    cursor = conn.cursor()
    
    # Tabla de contactos
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tabla de horarios
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS class_schedules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_name TEXT NOT NULL,
            instructor TEXT NOT NULL,
            time TEXT NOT NULL,
            day TEXT NOT NULL,
            duration TEXT NOT NULL
        )
    ''')
    
    # Tabla de planes
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS membership_plans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT NOT NULL,
            features TEXT NOT NULL
        )
    ''')
    
    # Insertar datos de ejemplo
    cursor.execute('SELECT COUNT(*) FROM class_schedules')
    if cursor.fetchone()[0] == 0:
        schedules = [
            (1, 'Spinning', 'Carlos Rodríguez', '07:00', 'Lunes', '45 min'),
            (2, 'Yoga', 'Ana Martínez', '08:00', 'Lunes', '60 min'),
            (3, 'CrossFit', 'Miguel López', '18:00', 'Lunes', '60 min'),
            (4, 'Zumba', 'Sofia García', '19:00', 'Martes', '45 min'),
            (5, 'Pilates', 'Laura Torres', '20:00', 'Martes', '60 min'),
            (6, 'Boxeo', 'Roberto Silva', '18:00', 'Miércoles', '60 min'),
            (7, 'Spinning', 'Carlos Rodríguez', '07:00', 'Jueves', '45 min'),
            (8, 'Yoga', 'Ana Martínez', '08:00', 'Viernes', '60 min'),
            (9, 'CrossFit', 'Miguel López', '18:00', 'Sábado', '60 min'),
            (10, 'Zumba', 'Sofia García', '10:00', 'Domingo', '45 min')
        ]
        cursor.executemany('INSERT INTO class_schedules VALUES (?, ?, ?, ?, ?, ?)', schedules)
    
    cursor.execute('SELECT COUNT(*) FROM membership_plans')
    if cursor.fetchone()[0] == 0:
        plans = [
            (1, 'Plan Básico', 29.99, 'Acceso básico al gimnasio', json.dumps(['Acceso a equipos básicos', 'Locker', 'Ducha'])),
            (2, 'Plan Premium', 49.99, 'Acceso completo con clases grupales', json.dumps(['Acceso a todos los equipos', 'Clases grupales incluidas', 'Locker premium', 'Ducha', 'Sauna'])),
            (3, 'Plan VIP', 79.99, 'Experiencia completa con entrenador personal', json.dumps(['Todo del plan Premium', 'Entrenador personal 2x semana', 'Plan nutricional', 'Acceso 24/7', 'Estacionamiento']))
        ]
        cursor.executemany('INSERT INTO membership_plans VALUES (?, ?, ?, ?, ?)', plans)
    
    conn.commit()
    conn.close()

# Inicializar base de datos al arrancar
@app.on_event("startup")
async def startup_event():
    init_db()

# Rutas de la API
@app.get("/")
async def root():
    return {"message": "¡Bienvenido a GymFit API!"}

@app.get("/api/about")
async def get_about():
    return {
        "title": "Quiénes Somos",
        "description": "GymFit es más que un gimnasio, es una comunidad dedicada a transformar vidas a través del fitness y el bienestar. Fundado en 2020, hemos ayudado a miles de personas a alcanzar sus objetivos de salud y fitness.",
        "mission": "Nuestra misión es proporcionar un ambiente motivador y profesional donde cada persona pueda alcanzar su máximo potencial físico y mental.",
        "values": [
            "Excelencia en el servicio",
            "Comunidad y apoyo mutuo",
            "Innovación en fitness",
            "Compromiso con la salud",
            "Diversidad e inclusión"
        ],
        "stats": {
            "members": 1500,
            "trainers": 15,
            "classes_per_week": 50,
            "years_experience": 4
        }
    }

@app.get("/api/schedule")
async def get_schedule():
    conn = sqlite3.connect('gymfit.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM class_schedules ORDER BY day, time')
    schedules = cursor.fetchall()
    conn.close()
    
    return [
        {
            "id": schedule[0],
            "class_name": schedule[1],
            "instructor": schedule[2],
            "time": schedule[3],
            "day": schedule[4],
            "duration": schedule[5]
        }
        for schedule in schedules
    ]

@app.get("/api/plans")
async def get_plans():
    conn = sqlite3.connect('gymfit.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM membership_plans')
    plans = cursor.fetchall()
    conn.close()
    
    return [
        {
            "id": plan[0],
            "name": plan[1],
            "price": plan[2],
            "description": plan[3],
            "features": json.loads(plan[4])
        }
        for plan in plans
    ]

@app.get("/api/location")
async def get_location():
    return {
        "address": "Av. Principal 1234, Centro Comercial Plaza Mayor",
        "city": "Buenos Aires",
        "province": "CABA",
        "postal_code": "1001",
        "phone": "+54 11 1234-5678",
        "email": "info@gymfit.com",
        "coordinates": {
            "lat": -34.6037,
            "lng": -58.3816
        },
        "hours": {
            "monday": "06:00 - 23:00",
            "tuesday": "06:00 - 23:00",
            "wednesday": "06:00 - 23:00",
            "thursday": "06:00 - 23:00",
            "friday": "06:00 - 23:00",
            "saturday": "08:00 - 22:00",
            "sunday": "08:00 - 20:00"
        }
    }

@app.post("/api/contact")
async def submit_contact(contact: ContactForm):
    try:
        conn = sqlite3.connect('gymfit.db')
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
            (contact.name, contact.email, contact.phone, contact.message)
        )
        conn.commit()
        conn.close()
        
        return {
            "success": True,
            "message": "¡Gracias por tu mensaje! Te contactaremos pronto."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al enviar el mensaje")

@app.get("/api/motivational-quotes")
async def get_motivational_quotes():
    quotes = [
        {
            "text": "El éxito no es final, el fracaso no es fatal: lo que cuenta es el coraje para continuar.",
            "author": "Winston Churchill"
        },
        {
            "text": "Tu cuerpo puede hacerlo. Es tu mente la que necesitas convencer.",
            "author": "Desconocido"
        },
        {
            "text": "La diferencia entre lo imposible y lo posible está en la determinación.",
            "author": "Tommy Lasorda"
        },
        {
            "text": "Cada día es una nueva oportunidad para ser mejor que ayer.",
            "author": "Desconocido"
        },
        {
            "text": "El dolor que sientes hoy será la fuerza que sientas mañana.",
            "author": "Arnold Schwarzenegger"
        },
        {
            "text": "No te rindas. El dolor es temporal, pero la victoria es para siempre.",
            "author": "Desconocido"
        },
        {
            "text": "La disciplina es el puente entre las metas y los logros.",
            "author": "Jim Rohn"
        },
        {
            "text": "Tu futuro es creado por lo que haces hoy, no mañana.",
            "author": "Robert Kiyosaki"
        }
    ]
    return quotes

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
