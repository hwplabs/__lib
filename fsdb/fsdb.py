 # TODO use file system as database
import os
import time
import hashlib
from random import *
from datetime import datetime


class FileSystemDatabase:

    ERROR = str()
    FMT = '%Y-%m-%d %H:%M:%S.%f'

    def __init__(self, file_name, delimiter='|'):
        # initialize class
        self.file = file_name
        li = file_name.split('.')
        self.base = li[0]
        self.type = li[1]
        self.cfg = delimiter

    def __str__(self):
        # return class data members
        return {
            'ERROR': self.ERROR,
            'file': self.file,
            'base': self.base,
            'type': self.type
        }

    ######################## SECTION 1 ########################

    def exist(self):
        # check if file exist
        return os.path.exists(self.file)

    def size(self):
        # get file size (in bytes)
        return os.path.getsize(self.file)

    def create(self, content=''):
        # create new file
        data = content.rstrip() + '\n' if len(content) > 0 else ''
        fsys = open(self.file, 'w')
        fsys.write(data)
        fsys.close()
        return True

    def insert(self, content):
        # insert new file content
        data = content.rstrip() + '\n'
        fsys = open(self.file, 'a')
        fsys.write(data)
        fsys.close()
        return True

    def insert_std(self, *args):
        # insert new file content with timestamp and as csv
        csv = str()
        for e in args:
            csv += '{}{}'.format(e, self.cfg)

        ts = datetime.now()
        content = '{}{}{}'.format(csv, ts, self.cfg)

        data = content.rstrip() + '\n'
        fsys = open(self.file, 'a')
        fsys.write(data)
        fsys.close()
        return True

    def read(self):
        # read file content
        fsys = open(self.file, 'r')
        data = fsys.read()
        fsys.close()
        return data

    def readline(self, nth):
        # read nth-line from file
        with open(self.file) as fsys:
            i = 1
            for e in fsys:
                if i == nth:
                    return e.rstrip()
                i += 1
            self.ERROR = 'IndexOutOfBound'

    def readlines(self, n):
        # read top n-lines from file
        with open(self.file) as fsys:
            data = str()
            i = 1
            for e in fsys:
                if i > n:
                    break
                data += e
                i += 1
        return data

    def readspan(self, start, end):
        # read file content between two points (m, n)
        if end <= start:
            self.ERROR = 'NegativeSpanWidth'
            return False

        with open(self.file) as fsys:
            data = str()
            i = 1
            for e in fsys:
                if i >= start and i <= end:
                    data += e
                i += 1
        return data

    def update(self, content, nth):
        # update nth-line in file
        with open(self.file) as fsys:
            data = str()
            i = 1
            for e in fsys:
                if i == nth:
                    data += content.rstrip() + '\n'
                else:
                    data += e
                i += 1
        return self.create(data)

    def delete(self, nth):
        # delete nth-line from file
        with open(self.file) as fsys:
            data = str()
            i = 1
            for e in fsys:
                if i == nth:
                    pass
                else:
                    data += e
                i += 1
        return self.create(data)

    def clear(self):
        # truncate file
        return self.create()

    def drop(self):
        # delete file
        if self.exist():
            os.remove(self.file)
            return True
        self.ERROR = 'FileNotFound'

    ######################## SECTION 2 ########################

    def build(self, csv):
        # convert csv to list
        return csv.split(self.cfg)

    def delimit(self, *args):
        # convert tuple to csv
        csv = str()
        for e in args:
            csv += '{}{}'.format(e, self.cfg)
        return csv

    def search(self, keyword, cell=0):
        # read line(s) which contains keyword
        k = keyword.strip()
        i = cell - 1
        li = self.enlist()
        lii = list()
        for e in li:
            if cell > 0:
                if k is e[i]:
                    lii.append(e)
            else:
                if k in e:
                    lii.append(e)
        return lii

    def enlist(self, nth=0):
        # read all/nth line as list items
        with open(self.file) as fsys:
            li = list()
            for e in fsys:
                arr = self.build(e)
                arr.pop()
                li.append(arr)

        if (nth > 0):
            i = nth - 1
            return li[i]
        return li

    def transpose(self):
        # read file contents as homogenous list items
        li = self.enlist()
        rows = len(li)
        cols = len(li[0])

        lii = []
        i = 0
        while i < cols:
            arr = list()
            j = 0
            while j < rows:
                e = li[j][i]
                arr.append(e)
                j += 1
            lii.append(arr)
            i += 1
        return lii

    def serialize(self, li, homogenous=True):
        # add serial number to list items
        lii = list()
        if homogenous == True:
            n = len(li[0])
            i = 1
            while i <= n:
                lii.append(str(i))
                i += 1
            li.insert(0, lii)
        else:
            n = len(li)
            i = 0
            while i < n:
                sn = i + 1
                li[i].insert(0, str(sn))
                i += 1
        return li

    def numrows(self):
        # get file line count
        li = self.enlist()
        return len(li)

    def backup(self):
        # create backup file
        data = self.read()
        # Ex. demo@20210610T181900-000000.txt
        ts = datetime.now()
        fmt = '%Y%m%dT%H%M%S-%f'
        ts_f = ts.strftime(fmt)
        copy = '{}@{}.{}'.format(self.base, ts_f, self.type)
        fsys = open(copy, 'w')
        fsys.write(data)
        fsys.close()
        return copy

    def seed(self):
        # create new file with dummy data
        li = [
            ["john", "jane", "jack", "jill", "jake", "jade", "jeff", "jess", 
                "joel", "joan", "josh", "jose", "jude", "june", "jean"],
            ['m', 'f', 'm', 'f', 'm', 'f', 'm', 'f',
                'm', 'f', 'm', 'm', 'm', 'f', 'm']
        ]
        size = len(li[0])

        data = str()
        i = 0
        while i < size:
            d = randint(1, 31)
            dd = '0{}'.format(d) if d < 10 else d
            m = randint(1, 12)
            mm = '0{}'.format(m) if m < 10 else m
            yyyy = randint(1990, 2000)

            name = '{} doe'.format(li[0][i])
            sex = li[1][i]
            dob = '{}/{}/{}'.format(mm, dd, yyyy)
            bmi = uniform(18, 31)
            bmi_f = round(bmi, 1)
            email = li[0][i] + '@email.com'
            tel = '+1(234)567-{}890'.format(i)
            tel_f = tel[0:15]

            ts = datetime.now()

            data += self.delimit(name, sex, dob, bmi_f,
                                 email, tel_f, ts) + '\n'
            i += 1

        if self.exist():
            self.backup()
        return self.create(data)

    def struct(self, li='this'):
        # convert timestamp to dtm format (20210624102227850752)
        li = self.enlist() if li == 'this' else li
        data = str()
        for e in li:
            data += '{}\n'.format(e)
        print(data)

    def context(self):
        # show file content with line numbers
        with open(self.file) as fsys:
            n = self.numrows()
            data = 'numrows ({})\n'.format(n)
            i = 1
            for e in fsys:
                data += 'line {} => {}\n'.format(i, e.rstrip())
                i += 1
        print(data)

    def tabulate(self):
        # display file content in relational format
        li = self.transpose()
        li = self.serialize(li)
        padx = list()
        for e in li:
            maxlen = 0
            for ee in e:
                strlen = len(ee)
                maxlen = strlen if strlen > maxlen else maxlen
            padx.append(maxlen)

        li = self.enlist()
        li = self.serialize(li, False)
        rows = len(li)
        cols = len(li[0])
        buf = str()
        i = 0
        while i < rows:
            sn = i + 1
            j = 0
            while j < cols:
                e = li[i][j]
                offset = padx[j] - len(e)
                px = ' ' * offset
                buf += '| {}{} '.format(e, px)
                j += 1
            buf += '|\n'
            i += 1
        tbody = buf.rstrip()

        buf = str()
        for e in padx:
            offset = e + 2
            px = '-' * offset
            buf += '+{}'.format(px)
        ruler = '{}+'.format(buf)

        table = '{}\n{}\n{}'.format(ruler, tbody, ruler)
        print(table)

    ######################## SECTION 3 ########################

    def now(self):
        # get current timestamp
        ts = datetime.now()
        return str(ts)

    def when(self, secs=86400):
        # get future timestamp measured in seconds
        # ex. 60=1min, 3600=1hrs, 86400=1day, 31536000=1yrs
        fmt = '%Y-%m-%d %H:%M:%S'
        t_now = time.time()
        t_then = t_now + secs
        t_local = time.localtime(t_then)
        return time.strftime(fmt, t_local)

    def keygen(self, size=6):
        # autogen finite sequence of numbers
        buf = str()
        i = 1
        while i <= size:
            r = randint(0, 9)
            buf += str(r)
            i += 1
        return buf

    def name_f(self, name):
        # brute-force convert to title casing
        name = name.lower()
        return name.title()

    def serial_f(self, number, chars=3):
        # serialize number with leading zeros
        n_str = str(number)
        n_str_size = len(n_str)
        if n_str_size > chars:
            return n_str
        else:
            diff = chars - n_str_size
            prefix = '0' * diff
            return prefix + n_str

    def hash_f(self, password):
        # encrypt password using md5 hash
        psw_str = str(password)
        psw_enc = psw_str.encode()
        psw_hash = hashlib.md5(psw_enc)
        return psw_hash.hexdigest()

    def ishash_f(self, password, hashed_f):
        # validate password using md5 hash
        return self.hash_f(password) == hashed_f

    def money_f(self, number):
        # convert to csv and 2dp
        n_float = float(number)
        n_round = round(n_float, 2)
        n_csv = format(n_round, ',')
        dp = n_csv.split('.')[1]
        return n_csv if len(dp) == 2 else n_csv + '0'

    def mktime_f(self, timestamp, ts_parse='%m/%d/%Y', ts_format='%d/%m/%Y'):
        # convert timestamp to predef datetime format (ex. 09/15/1992, %m/%d/%Y, %d/%m/%Y)
        ts = datetime.strptime(timestamp, ts_parse)
        return ts.strftime(ts_format)

    def epoch_f(self, timestamp='now'):
        # convert timestamp to unix epoch format (20210624102227850752)
        fmt = '%Y%m%d%H%M%S%f'
        ts = datetime.now() if timestamp == 'now' else datetime.strptime(timestamp, self.FMT)
        return ts.strftime(fmt)

    def datetime_f(self, timestamp='now'):
        # convert timestamp to std datetime format (YYYY-MM-DD HH:MM:SS)
        return self.date_f(timestamp) + ' ' + self.time_f(timestamp)

    def date_f(self, timestamp='now'):
        # convert timestamp to std date format (YYYY-MM-DD)
        fmt = '%Y-%m-%d'
        ts = datetime.now() if timestamp == 'now' else datetime.strptime(timestamp, self.FMT)
        return ts.strftime(fmt)

    def time_f(self, timestamp='now'):
        # convert timestamp to std time format (HH:MM:SS)
        fmt = "%X"
        ts = datetime.now() if timestamp == 'now' else datetime.strptime(timestamp, self.FMT)
        return ts.strftime(fmt)

    def date_t(self, timestamp='now'):
        # convert timestamp to win date format (Mon, Jan 01, 1970)
        fmt = '%a, %b %d, %Y'
        ts = datetime.now() if timestamp == 'now' else datetime.strptime(timestamp, self.FMT)
        return ts.strftime(fmt)

    def time_t(self, timestamp='now'):
        # convert timestamp to win time format (00:00 AM)
        fmt = '%I:%M %p'
        ts = datetime.now() if timestamp == 'now' else datetime.strptime(timestamp, self.FMT)
        return ts.strftime(fmt)

    def vardump(self, *args):
        # print arguments line by line
        res = str()
        for e in args:
            res += '{}\n'.format(e)
        print(res)

# HOWTO
# from fsdb import FileSystemDatabase
# fs = FileSystemDatabase("demo.txt")
# fs.seed()
# fs.tabulate()
