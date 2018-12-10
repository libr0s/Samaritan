from datetime import datetime

date_parser = lambda x: datetime.strptime(x,'%Y-%m-%d')