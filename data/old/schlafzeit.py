import pandas as pd
from datetime import datetime, timedelta
import time

def unixtime_to_date(unix_time):
    # Convert Unix time to struct time
    struct_time = time.localtime(unix_time)
    
    # Convert struct time to date string
    date_str = time.strftime('%Y-%m-%d  %H:%M:%S', struct_time)

    
    return date_str

def date_to_unixtime(date_str):
    # Convert date string to struct time
    struct_time = time.strptime(date_str, '%Y-%m-%d')
    
    # Convert struct time to Unix time
    unix_time = int(time.mktime(struct_time))
    
    return unix_time

def day_start_end_unix_time(date_str):
    # Convert date string to struct time
    struct_time = time.strptime(date_str, '%Y-%m-%d')
    
    # Get start and end time of the day
    start_of_day = time.mktime(struct_time)
    end_of_day = start_of_day + 86399  # 86399 seconds = 23 hours, 59 minutes, and 59 seconds

    return int(start_of_day), int(end_of_day)

def write_schlafzeit(df,name,date,dauer):
    start_time, end_time = day_start_end_unix_time(date)
    print("Start Unix time:", start_time)
    print("End Unix time:", end_time)
    print("Start of day  time:", unixtime_to_date(start_time))
    print("End of day  time:", unixtime_to_date(end_time))

  

    condition = (df['unix_time'] > start_time) & (
        df['unix_time'] < end_time)
    
    df.loc[condition, 'schlafdauer'] = dauer


    return df

   




class Schlafzeit:
    def __init__(self, name, date,dauer_vortag):
        self.name = name
        self.date = date
        self.dauer_vortag = dauer_vortag

# Creating instances of the Person class
schlafzeit1z = Schlafzeit("Zahra", "2024-01-24", 7.5)
schlafzeit2z = Schlafzeit("Zahra", "2024-01-25",8.3)
schlafzeit3z = Schlafzeit("Zahra", "2024-01-26",8)
schlafzeit4z = Schlafzeit("Zahra", "2024-01-27",8)
schlafzeit5z = Schlafzeit("Zahra", "2024-01-28",7.5)
schlafzeit6z = Schlafzeit("Zahra", "2024-01-29",8)
schlafzeit7z = Schlafzeit("Zahra", "2024-01-30",8)
schlafzeit8z = Schlafzeit("Zahra", "2024-01-31",7.5)
schlafzeit9z = Schlafzeit("Zahra", "2024-02-01",6)
schlafzeit10z = Schlafzeit("Zahra", "2024-02-02",8)
schlafzeit11z = Schlafzeit("Zahra", "2024-02-03",7.5)
schlafzeit12z = Schlafzeit("Zahra", "2024-02-04",8)


# Creating an array of objects
schlafzeitenZ = [schlafzeit1z, schlafzeit2z,schlafzeit3z,schlafzeit4z,schlafzeit5z,schlafzeit6z,schlafzeit7z,schlafzeit8z,schlafzeit9z,schlafzeit10z,schlafzeit11z,schlafzeit12z]


schlafzeit1a = Schlafzeit("ahn", "2024-01-24", 8)
schlafzeit2a = Schlafzeit("ahn", "2024-01-25",6.8)
schlafzeit3a = Schlafzeit("ahn", "2024-01-26",7.5)
schlafzeit4a = Schlafzeit("ahn", "2024-01-27",6.3)
schlafzeit5a = Schlafzeit("ahn", "2024-01-28",9.3)
schlafzeit6a = Schlafzeit("ahn", "2024-01-29",8.2)
schlafzeit7a = Schlafzeit("ahn", "2024-01-30",8.5)
schlafzeit8a = Schlafzeit("ahn", "2024-01-31",6.2)
schlafzeit9a = Schlafzeit("ahn", "2024-02-01",7.4)
schlafzeit10a = Schlafzeit("ahn", "2024-02-02",8.3)
schlafzeit11a = Schlafzeit("ahn", "2024-02-03",5.4)
schlafzeit12a = Schlafzeit("ahn", "2024-02-04",7.8)
schlafzeit13a = Schlafzeit("ahn", "2024-02-05",8.5)
schlafzeit14a = Schlafzeit("ahn", "2024-02-06",7.5)
schlafzeit15a = Schlafzeit("ahn", "2024-02-07",7.9)
schlafzeit16a = Schlafzeit("ahn", "2024-02-08",8.8)




# Creating an array of objects
schlafzeitenA = [schlafzeit1a, schlafzeit2a,schlafzeit3a,schlafzeit4a,schlafzeit5a,schlafzeit6a,schlafzeit7a,schlafzeit8a,schlafzeit9a,schlafzeit10a,schlafzeit11a,schlafzeit12a,schlafzeit13a,schlafzeit14a,schlafzeit15a,schlafzeit16a]


schlafzeit1k = Schlafzeit("khang", "2024-01-24", 4.5)
schlafzeit2k = Schlafzeit("khang", "2024-02-03",5)
schlafzeit3k = Schlafzeit("khang", "2024-02-04",9)
schlafzeit4k = Schlafzeit("khang", "2024-02-05",7)
schlafzeit5k = Schlafzeit("khang", "2024-02-06",7)
schlafzeit6k = Schlafzeit("khang", "2024-02-07",8)
schlafzeit7k = Schlafzeit("khang", "2024-02-08",8)
schlafzeit8k = Schlafzeit("khang", "2024-02-09",8)
schlafzeit9k = Schlafzeit("khang", "2024-02-10",7)
schlafzeit10k = Schlafzeit("khang", "2024-02-11",8.5)


# Creating an array of objects
schlafzeitenK = [schlafzeit1k, schlafzeit2k,schlafzeit3k,schlafzeit4k,schlafzeit5k,schlafzeit6k,schlafzeit7k,schlafzeit8k,schlafzeit9k,schlafzeit10k]



# df = pd.read_excel('./output_'+ 'ahn' +'.xlsx')
# df = pd.read_excel('./output_'+ 'Zahra' +'.xlsx')

def write_all(arr,name):
    df = pd.read_excel('data\interpolation_outputs\output_' + name + '.xlsx')
    for schlafzeit in schlafzeitenK:
       # print(f"Name: {schlafzeit.name}, date: {schlafzeit.date}, dauer_vortag: {schlafzeit.dauer_vortag}")
       write_schlafzeit(df,schlafzeit.name,schlafzeit.date,schlafzeit.dauer_vortag)
    df.to_csv('output_'+name+'_schlaf.csv', index=False)

write_all(schlafzeitenZ,'anh')


