import sys
import json

# Get the parameters passed from the command line
param1 = sys.argv[1]
param2 = sys.argv[2]
param3 = sys.argv[3]

# Do something with the parameters
result = {
    "param1": param1,
    "param2": param2,
    "param3": param3,
    "status": "I am the world!",
    "message": "Python script received the parameters."
}

# Print the result as JSON
print(json.dumps(result))
