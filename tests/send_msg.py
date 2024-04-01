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
print("Token: "+user1Token)

print("user2 logs in")
resp = requests.post(API_BASE+"/auth/login", data={"name": "user2", "password": "pass2"})
checkError(resp)
user2Token = resp.json()["access_token"]
print("Token: "+user1Token)

#print("user1 sends friend request to user2")
#resp = requests.post(API_BASE+"/users/sendFriendRequest", headers={"Authorization": f"Bearer {user1Token}"}, data={"user": "user2"})
#checkError(resp)
#
#print("user2 accepts the friend request sent by user1")
#resp = requests.post(API_BASE+"/users/acceptFriendRequest", headers={"Authorization": f"Bearer {user2Token}"}, data={"user": "user1"})
#checkError(resp)


print("user1 sends a message to user2")
resp = requests.post(API_BASE+"/messages/sendTextMessage", headers={"Authorization": f"Bearer {user1Token}"}, data={"user": "user2", "textContent": "Hello world"})
checkError(resp)


print("user1 sends a message to user88")
resp = requests.post(API_BASE+"/messages/sendTextMessage", headers={"Authorization": f"Bearer {user1Token}"}, data={"user": "user88", "textContent": "Hello world"})
checkError(resp)

