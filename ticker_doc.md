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
`tickers`<br> List with all the tickers we are working with in the current session???<br>
`originalTime`<br> timestamp when the ticker was created<br>
`currentTime`<br> current timestamp for the ticker <br> 
`isStarted`<br> indicates whether the ticker uses time intervals and a specific event is to occur after each interval (ex.: every 15 seconds)
`useIntervals`<br> indicates whether the ticker uses time intervals and a specific event is to occur after each interval (ex.: every 15 seconds)
`originalInterval<br> 	order number (index) of initial time interval where the ticker started
`currentInterval<br> blah
`delay<br> value of time between intervals - ???


#### 2.3 Public functions
`start(time: number, delay: number = 0): Ticker`<br>
Creates and starts a ticker.
Parameters:
`time`<br> current time value within the ticker - ??
`delay`<br> delay from starting point time to when  ticker is started

`startInterval(time: number, interval: number): Ticker`<br>
Creates and starts a ticker object with specific intervals between ticks.
Parameters:
`time`<br> timestamp starting point time for the ticker
`interval` - time between two ticks

`stop(withEnd: boolean = false)`<br>
Stops ticker and removes it from the list of tickers. 
If the ticker has an end, also ends it.

`update(dt: number)`<br>
Updates all started tickers and removes non-started.  

`destroy(ticker?: Ticker)`<br>
Stops a running ticker and unassigns the Ticker object from its current variable. 

`destroyMany(tickers: Ticker[])`<br>
calls `destroy` function on a list of Ticker objects.


#### 2.3 Private functions
`_update(dt: number)`<br>
blah

## Questions

? `delay` - delay from the starting point time to when ticker is started<br>
- what is delay
- what is the difference between 'stop' and 'end' events?




