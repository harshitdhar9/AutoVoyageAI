from langchain.tools import tool

# Will use weather api and other travel data

@tool
def get_weather(city:str)->str:
    """
    Get the current weather for a given city.
    Use this when user asks about weather or climate.
    """
    return f"The current weather in {city} is sunny"

@tool 
def get_travel_plan(destination:str,days:int)->str:
    """
    Generate a travel plan for a destination and number of days.
    Use this when user asks for trip planning or itinerary.
    """
    return f"A {days}-day itinerary for {destination}: Day 1: Arrival and city tour. Day 2: Visit local attractions. Day 3: Relax and shopping."