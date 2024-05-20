#
# elclasico 
# author: tmatyo
# v1.0 - 18-Mar-2019 
# v2.0 - 17-May-2024
#
# Tool for crawling livescore.sk to get next el clasico schedule and transfermarkt for statistics
#

from selenium import webdriver as wd
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup as bs
import json

# things
scheduleUrl = "https://www.flashscore.sk/tim/real-madrid/W8mj7MDD/program/"
fixtureUrl = "https://www.transfermarkt.com/vergleich/vereineBegegnungen/statistik/131_418"
userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) snap Chromium/80.0.3987.116 Chrome/80.0.3987.116 Safari/537.36"
ref = "https://www.google.sk/"
target = "Barcelona"
months = {
	"Jan": "01",
	"Feb": "02",
	"Mar": "03",
	"Apr": "04",
	"May": "05",
	"Jun": "06",
	"Jul": "07",
	"Aug": "08",
	"Sep": "09",
	"Oct": "10",
	"Nov": "11",
	"Dec": "12",
}

def viewSource(url):
	service = Service(executable_path='/usr/local/bin/chromedriver')
	options = wd.ChromeOptions()
	options.add_argument('headless')
	options.add_argument('no-sandbox')
	options.add_argument('disable-dev-shm-usage')
	options.add_argument('user-agent=' + userAgent)
	options.add_argument('referer=' + ref)
	driver = wd.Chrome(service=service, options=options)

	# actually get the page
	driver.get(url)

	# get the html from the page with a simple JS command
	web = driver.execute_script("return document.documentElement.outerHTML")

	# import the HTML into Soup
	return bs(web, 'html.parser')

def getSchedule():
	schedule = []
	tree = viewSource(scheduleUrl)

	# find the schedule
	result = tree.findAll('div', attrs={'class':'event__match'})

	# loop through the schedule to get relevant data
	for i in result:
		home = i.find('div', class_='event__participant--home').getText()
		away = i.find('div', class_='event__participant--away').getText()

		# if its elclasico, save data
		if(home.startswith(target) or away.startswith(target)):
			schedule.append({
				'time': i.find('div', class_='event__time').getText(),
				'home_team': home,
				'away_team': away
			})

	jsonDump('schedule', schedule)

def getWinner(homeTeam, homeScore, awayTeam, awayScore):
	winner = ''
	if(int(homeScore) > int(awayScore)):
		winner = homeTeam
	elif(int(homeScore) < int(awayScore)):
		winner = awayTeam
	elif(int(homeScore) == int(awayScore)):
		winner = "remiza"
	else:
		winner = ''
	
	return winner

def getStats(line):
	stats = []
	stats.append({
		'matches': line[0].getText(),
		'barca': line[1].getText(),
		'barca_goals': line[4].getText().split(':')[0],
		'draw': line[2].getText(),
		'real': line[3].getText(),
		'real_goals': line[4].getText().split(':')[1],
		'avg_attendance': line[5].getText()
	})
	
	jsonDump('stats', stats)

def getFixtures():
	fixtures = []
	tree = viewSource(fixtureUrl)
	result = tree.findAll('tr')

	for i in result:
		cells = i.findAll('td')

		if(len(cells) == 6):
			getStats(cells)
		
		if(len(cells) == 13):
			# match date
			date = cells[3].getText()
			date = date.split(',')
			monthAndDay = date[1].strip().split(' ')
			day = monthAndDay[1]
			
			if(int(monthAndDay[1]) < 10):
				day = "0" + day

			# team names
			home_team = cells[7].find('a').getText()
			away_team = cells[10].find('a').getText()

			# event data
			event = cells[1].find('img').get('title')
			match_report = cells[12].find('a').get('href')

			# parsing score to get winner
			score_meta = cells[12].find('a').contents[0].getText().strip().split(':')
			score_home = score_meta[0]
			score_away = score_meta[1].split(' ')[0]

			# putting together fixtures data
			fixtures.append({
				'date': date[2].strip() + "-" + months[monthAndDay[0]] + "-" + day,
				'home_team': home_team,
				'away_team': away_team,
				'event': event,
				'score': score_home + " : " + score_away,
				'winner': getWinner(home_team, score_home, away_team, score_away),
				'attendance': cells[11].getText(),
				'link': "https://www.transfermarkt.com" + match_report
			})

	jsonDump('fixtures', fixtures)

def jsonDump(filename, data):
	with open(filename + '.json', 'wt') as of:
		json.dump(data, of)

if __name__ == "__main__":
	
	# PART 1: get schedule
	getSchedule()

	# PART 2: get fixtures
	getFixtures()
