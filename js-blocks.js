(function() {
    
    function Calendar(element) {
        const days = ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];
        let render = function() {
            let now = moment();    
            element.innerHTML = `${days[now.day()]}, ${now.format('DD.MM.YYYY')}`;

            window.setTimeout(render, moment().add(1, 'd').startOf('day').diff(now));
        }
        render();
    }

    function Clock(element) {
        let render = function() {
            let now = moment();
            element.innerHTML = now.format('HH:mm');

            window.setTimeout(render, moment().add(1, 'm').startOf('minute').diff(now));
        }
        render();
    }
    
    for (let el of document.querySelectorAll('*[data-view=calendar]')) {
        new Calendar(el);
    }    
    for (let el of document.querySelectorAll('*[data-view=clock]')) {
        new Clock(el);
    }

})();
