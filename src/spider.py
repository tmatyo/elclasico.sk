
#
# elclasico v1.0
#
# Tool for crawling livescore.sk to get next el clasico fixtures
#
# tmatyo on 18-Mar-2019
#

from selenium import webdriver as wd
from bs4 import BeautifulSoup as bs
import json
import re

# things
scheduleUrl = "https://www.flashscore.sk/tim/real-madrid/W8mj7MDD/program/"
fixtureUrl = "https://www.flashscore.sk/zapas/OzulYnYD/#h2h;overall"
schedule = []
fixtures = []
target = "Real Madrid"

def viewSource(url):
	# make the request headless
	options = wd.ChromeOptions()
	options.add_argument('headless')
	driver = wd.Chrome(chrome_options=options)

	# actually get the page
	driver.get(url)

	# get the html from the page with a simple JS command
	web = driver.execute_script("return document.documentElement.outerHTML")

	# import the HTML into Soup
	return bs(web, 'html.parser')

# PART 1: get schedule
tree = viewSource(scheduleUrl)

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

# write schedule to file
with open('schedule.json', 'wb') as of:
	json.dump(schedule, of)

# PART 2: get fixtures
tree = viewSource(fixtureUrl)

# get the table with the fixtures
result = tree.find('table', attrs={'class':'h2h_mutual'})
result = result.findAll('tr', attrs={'class':'highlight'})

for i in result:
	teams = i.findAll('td', attrs={'class':'name'})
	home_team = teams[0].getText().encode('utf-8')
	away_team = teams[1].getText().encode('utf-8')

	# parsing score to get winner
	score = i.find('span', attrs={'class':'score'}).getText().encode('utf-8')
	score_meta = score[:5]
	score_home = score_meta[:1]
	score_away = score_meta[-1:]

	# get winner
	if(int(score_home) > int(score_away)):
		winner = home_team
	elif(int(score_home) < int(score_away)):
		winner = away_team
	elif(int(score_home) == int(score_away)):
		winner = "remiza"
	else:
		winner = 0

	# putting together fixtures data
	fixtures.append({
		'time': i.find('span', attrs={'class':'date'}).getText().encode('utf-8'),
		'home_team': home_team,
		'away_team': away_team,
		'event': i.find('td', attrs={'class':'flag_td'}).get('title').encode('utf-8')[:-2],
		'score': score_meta,
		'winner': winner,
		'link': "https://www.flashscore.sk/zapas/" + re.findall("'(\w+)'", i.get('onclick').encode('utf-8'))[0][4:]
	})

# write fixtures to file
with open('fixtures.json', 'wb') as of:
	json.dump(fixtures, of)

print(fixtures)