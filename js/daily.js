var adjlist = ["a good", "a wonderful", "an excellent", "a fabulous", "a terrific", "an amazing", "a positive", "a marvelous", "a spectacular", "an exceptional", "an astounding", "a phenomenal", "a superb", "a remarkable", "an awesome"];

function getRandomAdjective() {
    const index = Math.floor(Math.random() * adjlist.length);
    return adjlist[index];
}

function updateLocalTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZoneName: 'short'
    };
    const timeString = now.toLocaleString("en-US", options);
    const localTimeSpan = document.getElementById('time');
    localTimeSpan.textContent = timeString;
}

// Status dot blink, wired to the real clock rather than a free-running CSS
// animation, so the on/off flip lands exactly on each second boundary.
let dotOn = true;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function tickStatusDot() {
    const dot = document.querySelector('.status-dot');
    if (!dot || reducedMotion) return;
    dotOn = !dotOn;
    dot.style.opacity = dotOn ? '1' : '0';
}

function startSecondSyncedLoop(fn) {
    fn();
    const delay = 1000 - new Date().getMilliseconds();
    setTimeout(() => {
        fn();
        setInterval(fn, 1000);
    }, delay);
}

function updateYearProgress() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);

    const oneDay = 24 * 60 * 60 * 1000;
    const daysLeft = Math.ceil((end - now) / oneDay);
    const percentCompleted = ((now - start) / (end - start)) * 100;
    const percentDisplay = percentCompleted.toFixed(2);

    const barFill = document.getElementById('barFill');
    const barPct = document.getElementById('barPct');
    const daysLeftEl = document.getElementById('daysLeft');

    if (barFill) barFill.style.width = percentCompleted + '%';
    if (barPct) barPct.textContent = `${percentDisplay}%`;
    if (daysLeftEl) daysLeftEl.textContent = `${daysLeft} days left in ${now.getFullYear()}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const deterministicSpan = document.getElementById('adjective');
    deterministicSpan.textContent = getRandomAdjective();

    startSecondSyncedLoop(() => {
        updateLocalTime();
        tickStatusDot();
    });

    updateYearProgress();
    setInterval(updateYearProgress, 60000);
});
