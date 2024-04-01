import requests

API_BASE = "http://localhost:3000/api"

def checkError(resp):
    if not resp.ok:
        print(f"ERROR: {resp.status_code}: {resp.text}")
        exit(1)

print("user1 logs in")
resp = requests.post(API_BASE+"/auth/login", data={"name": "user1", "password": "pass1"})
checkError(resp)
user1Token = resp.json()["access_token"]

print("user1 calls endpoint")
resp = requests.get(API_BASE+"/users/getOwnUsername", headers={"Authorization": f"Bearer {user1Token}"})
checkError(resp)
print(f"API returned: '{resp.text}'");
print(f"API returned: '{resp.headers['Content-Type']}'");

