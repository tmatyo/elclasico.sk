
#
# elclasico v1.0
#
# Tool for crawling livescore.sk to get next el clasico fixtures
#
# tmatyo on 18-Mar-2019
#

from selenium import webdriver as wd
from bs4 import BeautifulSoup as bs
# import MySQLdb as mysql
# import sys
import json

# things
url = "https://www.flashscore.sk/tim/real-madrid/W8mj7MDD/program/"
schedule = []
target = "Real Madrid"

# db
# host = "127.0.0.1"
# user = "simba"
# password = "ugarak"
# db = "elclasico"

# if(mysql.Connection(host=host,user=user,passwd=password,db=db)):
# 	print("Connection OK")

# sys.exit()

# make the request headless
options = wd.ChromeOptions()
options.add_argument('headless')
driver = wd.Chrome(chrome_options=options)

# actually get the page
driver.get(url)

# get the html from the page with a simple JS command
web = driver.execute_script("return document.documentElement.outerHTML")

# import the HTML into Soup
tree = bs(web, 'html.parser')

# find the schedule
result = tree.findAll('tr', attrs={'class':'stage-scheduled'})

# loop through the schedule to get relevant data
for i in result:
	home = i.find('span', attrs={'class':'padr'}).getText().encode('utf-8')
	away = i.find('span', attrs={'class':'padl'}).getText().encode('utf-8')

	# if its elclasico, save data
	if(home == target or away == target):
		schedule.append({
			'time': i.find('td', attrs={'class':'time'}).getText().encode('utf-8'),
			'home_team': home,
			'away_team': away
		})

with open('schedule.json', 'wb') as of:
	json.dump(schedule, of)

print(schedule)