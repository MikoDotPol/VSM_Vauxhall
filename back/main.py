from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart Station VSM API")

# Разрешаем запросы с фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Автосоздание тестовых зон при первом запуске
@app.on_event("startup")
def startup_event():
    db = next(get_db())
    if db.query(models.Zone).count() == 0:
        db.add_all([
            models.Zone(name="Главный вестибюль", type="зал", capacity=500, current_count=120),
            models.Zone(name="Зал ожидания «Комфорт»", type="зал", capacity=200, current_count=45),
            models.Zone(name="Платформа №1", type="платформа", capacity=300, current_count=10),
        ])
        db.commit()


@app.get("/api/zones/", response_model=List[schemas.ZoneResponse])
def get_zones(db: Session = Depends(get_db)):
    return db.query(models.Zone).all()


@app.post("/api/zones/", response_model=schemas.ZoneResponse)
def create_zone(zone: schemas.ZoneCreate, db: Session = Depends(get_db)):
    db_zone = models.Zone(**zone.dict(), current_count=0)
    db.add(db_zone)
    db.commit()
    db.refresh(db_zone)
    return db_zone


@app.post("/api/events/")
def receive_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    # Простая имитация обновления зоны при событии
    transition = db.query(models.Transition).filter(models.Transition.id == event.transition_id).first()
    if transition:
        # Логика обновления count (для MVP - просто заглушка)
        pass

    return {"status": "success", "message": "Event received", "data": event}