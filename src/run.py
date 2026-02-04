from agent import agent

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": "Plan a 3 day trip to Jaipur and tell me the weather."
        }
    ]
})

print("\nFINAL ANSWER:\n")

print(result["messages"][-1].content)
