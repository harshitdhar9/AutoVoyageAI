def search_hotels(city: str, max_budget: int):
    hotels = [
        {"id": 1, "name": "Grand Palace", "city": city, "price": 4500, "rating": 4.3},
        {"id": 2, "name": "Ocean View Resort", "city": city, "price": 3800, "rating": 4.1},
        {"id": 3, "name": "Budget Stay Inn", "city": city, "price": 2500, "rating": 3.8},
        {"id": 4, "name": "Luxury Retreat", "city": city, "price": 7000, "rating": 4.7},
    ]

    filtered = [h for h in hotels if h["price"] <= max_budget]
    ranked = sorted(filtered, key=lambda x: x["rating"], reverse=True)
    return ranked


def book_hotel(hotel_id: int):
    return {
        "booking_id": f"BOOK{hotel_id}123",
        "status": "Confirmed"
    }