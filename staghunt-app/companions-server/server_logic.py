import json
from ast import literal_eval

def handle_request_data(byte_array):
    data = byte_array.peek().decode('utf-8')
    print("data", data)

    json_data = None

    try:
        json_data = json.loads(data)
    except:
        # request json data had formatting error
        print("Warning: Literal parsing.")
        json_data = literal_eval(data)

    if(json_data == None):
        print("Error: Unable to parse request data--")
    else:
        return retrieveGameData(json_data)

def retrieveGameData(characters):
    # method to get the npc character moves from companions
    return return_json(characters)

def return_json(data):
    return json.dumps(data, indent=4, sort_keys=True)

def pretty_print(data):
    print(return_json(data))
