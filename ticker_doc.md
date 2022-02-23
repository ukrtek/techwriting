# Documentation for ToddLearn Games App
V. 1.0
## Tickers 

### 1. Overviev
Ticker is a timer displayed while user is doing something in the app
Ticker can have interval, after each interval something happens.

*Example: in Complete-a-Drawing game (insert link to documentation), for each round there is a sound and visual notification after each time interval: 15 seconds, 30 seconds, 45 seconds, 60 seconds.*

### 2. Ticker implementation details
#### 2.1. Class Ticker overview
Class Ticker provides the API to create new ticker objects and manage existing ones. 
#### 2.2. Class fields
tickers - List with all the tickers we are working with in the current session ???
originalTime - timestamp when the ticker was created
currentTime - current timestamp for the ticker  
isStarted - indicates whether the ticker uses time intervals and a specific event is to occur after each interval (ex.: every 15 seconds)
useIntervals - indicates whether the ticker uses time intervals and a specific event is to occur after each interval (ex.: every 15 seconds)
originalInterval - 	order number (index) of initial time interval where the ticker started
currentInterval - blah
delay - value of time between intervals - ???


#### 2.3 Public functions
start(time: number, delay: number = 0)
Creates and starts a ticker.
Parameters:
time - current time value within the ticker - ??
delay - delay from starting point time to when  ticker is started

startInterval(time: number, interval: number)
Creates and starts a ticker object with specific intervals between ticks.
Parameters:
time - timestamp starting point time for the ticker
interval - time between two ticks

stop(withEnd: boolean = false)
Stops ticker and removes it from the list of tickers. 
If the ticker has an end, also ends it.

update(dt: number)
Updates all started tickers and removes non-started.  



#### 2.3 Private functions



Some content there.<br>

##

## 2.4 Questions

? delay - delay from the starting point time to when ticker is started<br>
- what is delay
- what is the difference between 'stop' and 'end' events?


