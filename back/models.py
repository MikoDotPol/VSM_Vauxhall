from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import datetime
from database import Base

class Zone(Base):
    __tablename__ = "zones"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    parent_id = Column(Integer, ForeignKey("zones.id"), nullable=True)
    capacity = Column(Integer, default=0)
    current_count = Column(Integer, default=0) # Добавили для MVP

class Transition(Base):
    __tablename__ = "transitions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    zone_a_id = Column(Integer, ForeignKey("zones.id"))
    zone_b_id = Column(Integer, ForeignKey("zones.id"))