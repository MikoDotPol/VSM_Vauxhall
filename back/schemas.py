from pydantic import BaseModel
from typing import Optional

class ZoneCreate(BaseModel):
    name: str
    type: str
    capacity: int = 100

class ZoneResponse(BaseModel):
    id: int
    name: str
    type: str
    capacity: int
    current_count: int

    class Config:
        from_attributes = True

class EventCreate(BaseModel):
    transition_id: int
    direction: str
    count: int