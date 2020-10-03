import socket


def int_to_bytes(i: int, *, signed: bool = False) -> bytes:
    length = ((i + ((i * signed) < 0)).bit_length() + 7 + signed) // 8
    return i.to_bytes(length, byteorder='big', signed=signed)


UDP_IP = "127.0.0.1"
UDP_PORT = 5005
x = int_to_bytes(-12, signed=True)
y = int_to_bytes(-344, signed=True)

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.sendto(x, (UDP_IP, UDP_PORT))
sock.sendto(y, (UDP_IP, UDP_PORT))
print('Message sent')
