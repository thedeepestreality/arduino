import asyncio
import json
import websockets
import socket

UDP_IP = "127.0.0.1"
UDP_PORT = 5005


def func(dct):
    return (dct['x'], dct['y'])


async def connect(websocket, path):
    async for message in websocket:
        print(message)
        data = json.loads(message, object_hook=func)
        print(str(data[0])+' '+str(data[1]))
        # sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # sock.sendto(x, (UDP_IP, UDP_PORT))
        # sock.sendto(y, (UDP_IP, UDP_PORT))


start_server = websockets.serve(connect, "192.168.43.188", 5679)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
