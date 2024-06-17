# elclasico.sk ⚽

### ABOUT 🚀

A countdown to the next elclasico match. Stats and fixtures from past clashes of FC Barcelona and Real Madrid. Schedule is from flashscore.sk and fixtures with statistics are gathered from transfermarkt.com. 

First version was live since 2019, however flashscore html structure was updated multiple times so the crawler went nowhere. Updated the crawler (spyder.py) to V2 in May 2024, deployed in June.

### TECH STACK 🏗️

The spider is written in Python 3. The script generates 3 JSON files `scheudle.json`, `fixtures.json` and `stats.json`. These are loaded and rendered by the front end. The script uses `Selenium` and `BeautifulSoup4`.

Front end app for this page was and still is written in `React` as an exercise. in May 2024 updated to modern `React`, `npm` and `nodeJS`. Not much computing is going on, the FE is just async loading the JSON files and rendering the content.

### DEPENDENCIES 📦

`Ubuntu 24` is installed on the server. The Python script is run by cron every day at 1:23. The script runs in the `build` folder created of the FE app. Python binaries are loaded from the `venv` folder like `.venv/bin/python3`. 

Dependencies are in `requirements.txt`. One external dependency is the `chromedriver` that needs to be downloaded and unzipped into `/usr/local/bin`. During dev `version 126` was used. NOTE: `ChromeDriver ≠ Chrome browser`, Chrome browser also needs to be installed.
