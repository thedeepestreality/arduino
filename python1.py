import asyncio
import json
import websockets
import socket

UDP_IP = "127.0.0.1"
UDP_PORT = 5005


def func(dct):
    return (int(dct['x']), int(dct['y']))


async def connect(websocket, path):
    async for message in websocket:
        print(message)
        a = json.dumps(message)
        data = json.loads(a, object_hook=func)
        #data = json.loads('{"x":1,"y":2}', object_hook=func)
        print(data[0])
        # x = str(data[0]).encode()
        # y = str(data[1]).encode()
        # sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # sock.sendto(x, (UDP_IP, UDP_PORT))
        # sock.sendto(y, (UDP_IP, UDP_PORT))


start_server = websockets.serve(connect, "192.168.43.188", 5679)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
