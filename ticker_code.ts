 import { EventEmitter } from 'events';

 /* 
 Disclaimer: due to limited knowledge of the system,the following comments are often 
 based on assumptions. 
 */
 class Ticker extends EventEmitter {
	// all the tickers we are working with in the current session
     public static tickers: Ticker[] = [];
	// timestamp when the ticker was created  
     public originalTime: number = 0;
	// current timestamp for the ticker  
     public currentTime: number = 0;
	//  indicates whether the ticker has already been started
     public isStarted: boolean = false;
	//  indicates whether the ticker uses time intervals and a specific event is to occur after each interval (ex.: every 15 seconds)
     public useIntervals: boolean = false;
	//  order number (index) of initial time interval where the ticker started
     public originalInterval: number = 0;
     public currentInterval: number = 0;
	// value of time between intervals - ???
     public delay: number = 0;
 
	//  creates and starts a ticker
	// params: 
	// time - current time value within the ticker
	// ? delay - delay from the starting point time to when ticker is started
     public start(time: number, delay: number = 0): Ticker {
	 this.originalTime = time;
	 this.currentTime = 0;
	 this.useIntervals = false;
	 this.isStarted = true;
	 this.delay = delay;
	 Ticker.tickers.push(this);
	//  calls emit() function from the ancestor class EventEmitter - see details _here_
	 this.emit('start');
	 return this;
     }
 
	/*  creates and starts a ticker object with specific intervals between ticks
	params:
	time - timestamp starting point time for the ticker
	// interval - time between two ticks*/
     public startInterval(time: number, interval: number): Ticker {
	 this.start(time);
	 this.useIntervals = true;
	 this.originalInterval = interval;
	 this.currentInterval = 0;
	 this.isStarted = true;
	 Ticker.tickers.push(this);
	 this.emit('start');
	 return this;
     }
	
	 /* 
	 Q: what is the difference between 'stop' and 'end' events?
	 */
     public stop(withEnd: boolean = false): Ticker {
	 this.useIntervals = false;
	//  filters the ticker that needs to be stopped out of the list of tickers
	 Ticker.tickers = Ticker.tickers.filter((x) => x !== this);
	 this.emit('stop');
	 if (withEnd) {
	     this.emit('end');
	 }
	 this.isStarted = false;
	 return this;
     }
 
     private _update(dt: number): void {
	 this.currentTime += dt;
 
	 if (this.currentTime < this.delay) {
	     return;
	 } else {
	     this.currentTime -= this.delay;
	     this.delay = 0;
	     this.emit('delayStart');
	 }
 
	 const ct = this.currentTime;
	 const ot = this.originalTime;
	 const ci = this.currentInterval;
	 const oi = this.originalInterval;
 
	 let perc = ct / ot;
 
	 if (ot === -1 && oi) {
	     perc = ci / oi;
	 }
 
	 if (this.useIntervals) {
	     this.currentInterval += dt;
	     if (this.currentInterval >= this.originalInterval) {
		 this.currentInterval = 0;
		 if (perc <= 1) {
		     if (ot === -1) {
			 perc = 0;
		     }
		     this.emit('interval', { ct, ot, perc });
		 }
	     }
	 }
 
	 if (this.originalTime === -1 || this.currentTime <= this.originalTime) {
	     this.emit('update', { ct, ot, perc, dt });
	 } else {
	     this.emit('update', { ct: ot, ot: ot, perc: 1, dt: dt });
	     if (this.useIntervals) {
		 this.emit('interval', { ct: ot, ot: ot, perc: 1 });
	     }
	     this.stop(true);
	     return;
	 }
     }

	 /*
	 Updates all started tickers and removes non-started.  
	 */
     public static update(dt: number): void {
	 for (let i = 0; i < Ticker.tickers.length; i++) {
	     const x = Ticker.tickers[i];
	     if (x.isStarted) {
		 x._update(dt);
	     } else {
		 Ticker.tickers.splice(i, 1);
		 --i;
	     }
	 }
     }
 
     public static destroy(ticker?: Ticker) {
	 if (ticker) {
	     if (ticker.isStarted) {
		 ticker.stop();
	     }
	     ticker = undefined;
	 }
     }
 
     public static destroyMany(tickers: Ticker[]) {
	 tickers.forEach((ticker: Ticker) => {
	     Ticker.destroy(ticker);
	 });
	 tickers = [];
     }
 }
 
 export { Ticker };
 