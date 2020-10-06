import socket

UDP_IP = "127.0.0.1"
UDP_PORT = 5005

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((UDP_IP, UDP_PORT))
while True:
    x, addr = sock.recvfrom(1024)
    y, addr = sock.recvfrom(1024)
    print("x:", int(bytes.decode(x)))
    print("y:", int(bytes.decode(y)))
