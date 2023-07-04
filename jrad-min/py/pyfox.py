# TODO python library
import socket
import time
from datetime import datetime
from random import *

FMT = '%Y-%m-%d %H:%M:%S.%f'


def pc():
    # get pc user
    return socket.gethostname()


def ip():
    # get ip address
    return socket.gethostbyname(pc())


def hash_f(password):
    # encrypt password using md5 hash
    psw_str = str(password)
    psw_enc = psw_str.encode()
    psw_hash = hashlib.md5(psw_enc)
    return psw_hash.hexdigest()


def is_hash_f(password, hashed_f):
    # validate password using md5 hash
    return hash_f(password) == hashed_f


def now():
    # get current timestamp
    ts = datetime.now()
    return str(ts)


def datetime_f(timestamp='now'):
    # convert timestamp to std datetime format (YYYY-MM-DD HH:MM:SS)
    return date_f(timestamp) + ' ' + time_f(timestamp)


def date_f(timestamp='now'):
    # convert timestamp to std date format (YYYY-MM-DD)
    fmt = '%Y-%m-%d'
    ts = datetime.now() if timestamp == 'now' else datetime.strptime(timestamp, FMT)
    return ts.strftime(fmt)


def time_f(timestamp='now'):
    # convert timestamp to std time format (HH:MM:SS)
    fmt = "%X"
    ts = datetime.now() if timestamp == 'now' else datetime.strptime(timestamp, FMT)
    return ts.strftime(fmt)


def date_t(timestamp='now'):
    # convert timestamp to win date format (Mon, Jan 01, 1970)
    fmt = '%a, %b %d, %Y'
    ts = datetime.now() if timestamp == 'now' else datetime.strptime(timestamp, FMT)
    return ts.strftime(fmt)


def time_t(timestamp='now'):
    # convert timestamp to win time format (00:00 AM)
    fmt = '%I:%M %p'
    ts = datetime.now() if timestamp == 'now' else datetime.strptime(timestamp, FMT)
    return ts.strftime(fmt)


# HOWTO

# from . helpers import *
# ts = pyfox.now()
# print(ts)

# from . helpers import pyfox
# ts = pyfox.now()
# print(ts)



# *1. `keygen (size)`
# 2. `safe_f (post)` <!-- trim, escape -->
# 3. `name_f (string)`
# 4. `email_f (email)` <!-- mailto, lower)
# 5. `file_f (dir, file)`
# 6. `money_f (int/float)`  <!-- 1,995.00 -->
# *7. `serial_f (int, size)`
# 9. `regex (str, type)` <!-- int, name, email, password -->
# 11. `when (dt, secs)`
# 16. `newdt_f (dt, dt_f, new_dt_f)`
# 17. `null_f (str, def = 'N/A')`
# 18. `enum_f (array, i)`
# *19. `mask_f (str)` <!-- *** -->