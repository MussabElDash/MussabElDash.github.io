if (typeof jQuery === 'undefined') { throw new Error('JSTimer requires jQuery') }

(function ($, window, undefined) {
	"use strict";

	window.JSTimer = function (functionToBeCalled, milliSeconds, options) {

		if( !(this instanceof JSTimer) )
			return new JSTimer(functionToBeCalled, milliSeconds, options);

		var options = options || {};
		var milliSecondsStart = options["milliSeconds"] || 0;
		var secondsStart = options["seconds"] || 0;
		var minutesStart = options["minutes"] || 0;
		var hoursStart = options["hours"] || 0;
		var step = options["step"] || 1000;
		var $milliSeconds = $(options["milliSecondsSelector"] || "");
		var $pureMilliSeconds = $(options["pureMilliSecondsSelector"] || "");
		var $seconds = $(options["secondsSelector"] || "");
		var $pureSeconds = $(options["pureSecondsSelector"] || "");
		var $minutes = $(options["minutesSelector"] || "");
		var $pureMinutes = $(options["pureMinutesSelector"] || "");
		var $hours = $(options["hoursSelector"] || "");
		var onInverseStop = options["onInverseStop"] || function(){};
		var leadingZero = options["leadingZero"] || true;
		this.milliSecond = milliSecondsStart + secondsStart * 1000 + minutesStart * 60000 + hoursStart * 3600000;

		function pad(n, r) {
			var number = parseInt(1 + Array(r).join("0"), 10);
			return n < number ? Array(r - (n + "").length + 1).join("0") + n : n;
		}

		var increment = function () {
			this.milliSecond += step;
			setTimeToElements.call(this);
			if( (this.milliSecond + milliSecondsStart) % milliSeconds == 0){
				functionToBeCalled.call(this);
			}
		}

		var decrement = function () {
			if(this.milliSecond == 0){
				clearInterval(this.timer);
				onInverseStop.call(this);
				return;
			}
			this.milliSecond -= step;
			setTimeToElements.call(this);
			if ( (milliSecondsStart - this.milliSecond) % milliSeconds == 0){
				functionToBeCalled.call(this);
			}
			if(this.milliSecond == 0){
				clearInterval(this.timer);
				onInverseStop.call(this);
			}
		}

		var setTimeToElements = function(){
			var hours = this.hours();
			var minutes = this.minutes();
			var seconds = this.seconds();
			var milliSeconds = this.milliSeconds();
			var pureMinutes = this.pureMinutes();
			var pureSeconds = this.pureSeconds();
			$milliSeconds.text(leadingZero ? pad(milliSeconds, 3) : milliSeconds);
			$seconds.text(leadingZero ? pad(seconds, 2) : seconds);
			$minutes.text(leadingZero ? pad(minutes, 2) : minutes);
			$hours.text(leadingZero ? pad(hours, 2) : hours );
			$pureMinutes.text(leadingZero ? pad(pureMinutes, 2) : pureMinutes);
			$pureSeconds.text(leadingZero ? pad(pureSeconds, 2) : pureSeconds);
			$pureMilliSeconds.text(leadingZero ? pad(this.milliSecond, 3) : this.milliSecond);
		}

		this.inverseStart = function () {
			setTimeToElements.call(this);
			if( (this.milliSecond - milliSecondsStart) % milliSeconds == 0){
				functionToBeCalled.call(this);
			}
			var contextThis = this;
			this.timer = setInterval(function(){
				decrement.call(contextThis);
			}, step);
		}

		this.start = function () {
			setTimeToElements.call(this);
			if( (this.milliSecond + milliSecondsStart) % milliSeconds == 0){
				functionToBeCalled.call(this);
			}
			var contextThis = this;
			this.timer = setInterval(function(){
				increment.call(contextThis);
			}, step);
		}

		this.milliSecondSelector = function (selector) {
			if(selector == undefined)
				return $milliSecondsSelector.selector;
			$milliSecondsSelector = $(selector);
			return this;
		}

		this.secondsSelector = function (selector){
			if(selector == undefined)
				return $secondsSelector.selector;
			$secondsSelector = $(selector);
			return this;
		}

		this.minutesSelector = function (selector){
			if(selector == undefined)
				return $minutesSelector.selector;
			$minutesSelector = $(selector);
			return this;
		}

		this.hoursSelector = function (selector){
			if (selector == undefined)
				return $hoursSelector.selector;
			$hoursSelector = $(selector);
			return this;
		}

		this.pureMilliSecondsSelector = function (selector){
			if (selector == undefined)
				return $pureMilliSecondsSelector.selector;
			$pureMilliSecondsSelector = $(selector);
			return this;
		}

		this.pureSecondsSelector = function (selector){
			if (selector == undefined)
				return $pureSecondsSelector.selector;
			$pureSecondsSelector = $(selector);
			return this;
		}

		this.pureMinutesSelector = function (selector){
			if (selector == undefined)
				return $pureMinutesSelector.selector;
			$pureMinutesSelector = $(selector);
			return this;
		}

		this.onInverseStop = function (theFunction){
			if(theFunction == undefined)
				return onInverseStop;
			onInverseStop = theFunction;
			return this;
		}

		this.leadingZero = function (bool){
			if(bool == undefined)
				return leadingZero;
			leadingZero = bool;
			return this;
		}

		this.milliSeconds = function (milli){
			if(milli == undefined)
				return this.milliSecond % 1000;
			var tempMilli1 = this.milliSecond % 1000;
			var tempMilli2 = tempMilli1 * 1000;
			this.milliSecond = tempMilli2 + milli % 1000;
			return this;
		}

		this.seconds = function (secs){
			if(secs == undefined)
				return Math.floor(this.milliSecond / 1000) % 60;
			var tempSecs1 = this.milliSecond - this.seconds() * 1000;
			var tempSecs2 = seconds % 60;
			this.milliSecond = tempSecs1 + tempSecs2 * 1000;
			return this;
		}

		this.minutes = function (mins){
			if(mins == undefined)
				return Math.floor(this.milliSecond / 60000) % 60;
			var tempMins1 = this.milliSecond - this.minutes() * 60000;
			var tempMins2 = mins % 60;
			this.milliSecond = tempMilli1 + tempMins2 * 60000;
			return this;
		}

		this.hours = function (hs){
			if(hs == undefined)
				return Math.floor(this.milliSecond / 3600000);
			var temph = this.milliSecond - this.hours() * 3600000;
			this.milliSecond = temph + hs * 3600000;
			return this;
		}

		this.pureMilliSeconds = function (ms){
			if(ms == undefined)
				return this.milliSecond;
			this.milliSecond = ms;
			return this;
		}

		this.pureSeconds = function (sec){
			if(sec == undefined)
				return Math.floor(this.milliSecond / 1000);
			this.milliSecond = sec * 1000;
			return this;
		}

		this.pureMinutes = function (min){
			if(min == undefined)
				return Math.floor(this.milliSecond / 60000);
			this.milliSecond = min * 60000;
			return this;
		}
	}
})(jQuery, window);