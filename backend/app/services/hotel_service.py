def mock_search_hotels(city: str, budget: int):
    hotels = [
        {"name": "Grand Palace", "city": city, "price": 4500, "rating": 4.3},
        {"name": "Ocean View Resort", "city": city, "price": 3800, "rating": 4.1},
        {"name": "Budget Stay Inn", "city": city, "price": 2500, "rating": 3.8},
    ]

    return [h for h in hotels if h["price"] <= budget]