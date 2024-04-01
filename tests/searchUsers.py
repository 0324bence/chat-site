import requests
import json

API_BASE = "http://localhost:3000/api"

def checkError(resp):
    if not resp.ok:
        print(f"ERROR: {resp.status_code}: {resp.text}")
        exit(1)

resp = requests.get(API_BASE+"/users/searchUsersByName", params={"value": "us"})
checkError(resp)
print(f"API returned: '{json.dumps(resp.json(), indent=2)}'");

resp = requests.get(API_BASE+"/users/searchUsersByName", params={"value": "kin", "onlyBeginning": True})
checkError(resp)
print(f"API returned: '{json.dumps(resp.json(), indent=2)}'");

resp = requests.get(API_BASE+"/users/searchUsersByName", params={"value": "kin", "onlyBeginning": False})
checkError(resp)
print(f"API returned: '{json.dumps(resp.json(), indent=2)}'");
