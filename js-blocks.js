(function() {
    
    function Calendar(element) {
        const days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
        const months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
        var render = function() {
            var now = moment();    
            element.innerHTML = `${days[now.day()]}, ${now.format('DD')}. ${months[now.month()]} ${now.format('YYYY')}`;

            window.setTimeout(render, moment().add(1, 'd').startOf('day').diff(now));
        }
        render();
    }

    function Clock(element) {
        var render = function() {
            var now = moment();
            element.innerHTML = now.format('HH:mm');

            window.setTimeout(render, moment().add(1, 'm').startOf('minute').diff(now));
        }
        render();
    }

    function Event(element) {
        var render = function() {
            var visible = true;

            var now = moment();
            var after = element.dataset.eventAfter;
            if (after) {
                visible &= now.isAfter(moment(after, 'HH:mm'));
            }

            var before = element.dataset.eventBefore;
            if (before) {
                visible &= now.isBefore(moment(before, 'HH:mm'));
            }

            var days = element.dataset.eventDays;
            if (days) {
                days = days.split(',');
                const weekDays = ['sun','mon','tue','wed','thu','fri','sat'];
                for (var i = 0; i < weekDays.length; i++) {
                    if (days.includes(weekDays[i])) {
                        days.push("" + i);
                    }
                }
                visible &= days.includes("" + now.day());
            }
    
            element.style.display = (visible) ? '' : 'none';
            window.setTimeout(render, moment().add(1, 'm').startOf('minute').diff(now));
        }
        render();
    }
   
    function Countdown(element) {
	var end = moment(element.dataset.countdownUntil || element.textContent);
	var render = function() {
		var now = moment();
		if (now.isSame(end, 'days')) {
			element.textContent = 'Heute';
		} else if (now.isAfter(end)) {
			element.textContent = '';
			return;
		} else {
			var days = end.diff(now, 'd') + 1;
			while (now.isBefore(end)) {
				if (now.day() < 1 || now.day() > 5) {
					days--;
				}
				now = now.add(1, 'day');
			}
			element.textContent = `noch ${days} Arbeitstag(e)`;
		}
            	window.setTimeout(render, moment().add(1, 'd').startOf('day').diff(now));
	}
    	render();
    }

    Array.from(document.querySelectorAll('*[data-view=calendar]')).forEach(el => new Calendar(el));
    Array.from(document.querySelectorAll('*[data-view=clock]')).forEach(el => new Clock(el));
    Array.from(document.querySelectorAll('*[data-view=event]')).forEach(el => new Event(el));
    Array.from(document.querySelectorAll('*[data-view=countdown]')).forEach(el => new Countdown(el));

})();
