from langchain.tools import tool
from app.services.hotel_service import mock_search_hotels

@tool
def search_hotels(city: str, budget: int):
    """Search hotels based on city and budget."""
    return mock_search_hotels(city, budget)


@tool
def calculate_budget(total_budget: int, days: int):
    """Split total trip budget into per-day budget."""
    return {"per_day_budget": total_budget // days}


@tool
def generate_itinerary(city: str, days: int):
    """Generate a simple itinerary."""
    return f"{days}-day itinerary for {city}: sightseeing, food tour, relaxation."