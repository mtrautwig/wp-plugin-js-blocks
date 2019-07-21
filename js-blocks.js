(function() {
    
    function Calendar(element) {
        const days = ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];
        var render = function() {
            var now = moment();    
            element.innerHTML = `${days[now.day()]}, ${now.format('DD.MM.YYYY')}`;

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
    
    for (var el of document.querySelectorAll('*[data-view=calendar]')) {
        new Calendar(el);
    }    
    for (var el of document.querySelectorAll('*[data-view=clock]')) {
        new Clock(el);
    }

    Array.from(document.querySelectorAll('*[data-view=event]')).forEach(el => new Event(el));

})();
