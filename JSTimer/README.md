# JSTimer


A JavaScript library for Timer

This Library can be used to do a certain functionality every certian milliSeconds

## Usage
To get the time we could use

```var timer = Timer(function, milliSeconds[, options])```

or

```var timer = new Timer(function, milliseconds[, options])```

**and to start :**

```timer.start()``` to start the up timer

or

```timer.inverseStart()``` to start the down timer

### Options
* **function :** The function that needs to be executed
* **milliSeconds :** The time interval between two consecutive execution of the function
* **options :** There are good number of options that can be used here 
    * **milliSecondsSelector :** A JQuery selector of the DOM elements that will display the current timer milliSeconds
    * **secondsSelector :** A JQuery selector of the DOM elements that will display the current timer seconds
    * **minutesSelector :** A JQuery selector of the DOM elements that will display the current timer minutes
    * **hoursSelector :** A JQuery selector of the DOM elements that will display the current timer hours
    * **pureMilliSecondsSelector :** A JQuery selector of the DOM elements that will display the current timer's time in milliseconds
    * **pureSecondsSelector :** A JQuery selector of the DOM elements that will display the current timer's time in seconds
    * **onInverseStop :** The function that going to be executed when the count down stops (reaches zero milliseconds)
    * **leadingZero :** A boolean value indicating if the numbers that going to be displayed in the DOM elements will be having leading zeros (ex. 05 instead of 5)
    * **milliSeconds :** The number of milliSeconds the timer starts at (available in both count down and count up)
    * **seconds :** The number of seconds the timer starts at (available in both count down and count up)
    * **hours :** The number of hours the timer starts at (available in both count down and count up)

#### Defaults
* **milliSecondsSelector :** ```""```
* **secondsSelector :** ```""```
* **minutesSelector :** ```""```
* **hoursSelector :** ```""```
* **pureMilliSecondsSelector :** ```""```
* **pureSecondsSelector :** ```""```
* **onInverseStop :** ```function(){}```
* **leadingZero :** ```true```

---

### Methods
There are also setters and getters for those options if they are wanted to be added later :
 - **milliSecondsSelector() :** sets and gets the current millisecondsSelector
 - **secondsSelector() :** sets and gets the current secondsSelector
 - **minutesSelector() :** sets and gets the current minutesSelector
 - **hoursSelector() :** sets and gets the current hoursSelector
 - **pureMilliSecondsSelector() :** sets and gets the current pureMillisecondsSelector
 - **pureSecondsSelector() :** sets and gets the current pureSecondsSelector
 - **pureMinutesSelector() :** sets and gets the current pureMinutesSelector
 - **onInverseStop() :** sets and gets the current onInverseStop function
 - **leadingZero() :** sets and gets the current boolean of leadingZero
 - **milliSeconds() :** sets and gets the current timer's milliseconds (when setting it uses % 1000)
 - **seconds() :** sets and gets the current timer's seconds (when setting it uses % 60)
 - **minutes() :** sets and gets the current timer's minutes (when setting it uses % 60)
 - **hours() :** sets and gets the current timer's hours
 - **pureMilliSeconds() :** sets and gets the current timer in milliSeconds
 - **pureSeconds() :** sets and gets the current timer in seconds
 - **pureMinutes() :** sets and gets the current timer in minutes

## Examples

**in the HTML file :**

```<span id="hours"></span> : <span id="mins"></span> : <span id="secs"></span><br><span id="double"></span>``````

**in the JavaScript code :**

1) ```var timer = JSTimer(function(){}, 1000, {
    secondsSelector: "#secs",
    minutesSelector: "#mins",
    hoursSelector: "#hours"
});
timer.start();```

**The above code will display a timer in the spans**

2) ```var timer = JSTimer(function(){}, 1000, {
   seconds: 120,
   onInverseStop: function(){
      alert("The timer has Stopped");
   }
});
timer.inverseStart();```

**The above code will display a down timer starting from 2 minutes (00:02:00) in the spans and when the timer reaches 00:00:00 will show an alert message**

3) ```var timer = JSTimer(function(){
   $("#double").text(2 * this.seconds());
}, 10000);
timer.start();```

**The above code will show the double of the current seconds every 10 seconds (20, 40, 60, 80, 100, 0, 20, 40, ....)**

---

## Requirments:
* JQuery only

## Licence

JSTimer is licensed under MIT http://www.opensource.org/licenses/MIT

#### Copyright &copy;, Mussab ElDash
<mussab14@gmail.com>
