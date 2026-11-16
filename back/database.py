from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# --- БЫСТРЫЙ СТАРТ: SQLite (не требует установки) ---
SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:postgres@localhost:5432/smart_station_db"

# --- ДЛЯ POSTGRESQL (раскомментируйте, когда будет готово) ---
# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost:5432/smart_station_db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()