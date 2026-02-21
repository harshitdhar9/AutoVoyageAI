from langchain.tools import tool
from app.services.hotel_service import search_hotels_mock, book_hotel_mock
from app.core.redis_client import store_hotels, get_hotels

@tool
def search_hotels(city: str, max_budget: int, session_id: str = ""):
    """Search hotels and store in Redis."""
    hotels = search_hotels_mock(city)
    filtered = [h for h in hotels if h["price"] <= max_budget]
    store_hotels(session_id, filtered)
    return filtered

@tool
def book_hotel_by_index(index: int, session_id: str):
    """Book hotel based on index from last search."""
    hotels = get_hotels(session_id)
    if not hotels or index >= len(hotels):
        return "Invalid selection."
    selected = hotels[index]
    return book_hotel_mock(selected["id"])