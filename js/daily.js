var adjlist = ["a good", "a wonderful", "an excellent","a fabulous","a terrific", "an amazing", "a positive", "a marvelous", "a spectacular", "an exceptional", "an astounding", "a phenomenal", "a superb", "a remarkable", "an awesome"];

function getTodayIndex() {
    // today's date as a string in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // hash function to convert date string to a number
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
        hash = (hash << 5) - hash + today.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    // use hash to determine the index in the array
    const index = Math.abs(hash) % adjlist.length;
    return index;
}

function getTodayText() {
    const index = getTodayIndex();
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

function updateYearProgress() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const end = new Date(now.getFullYear(), 11, 31);
    
    const diffStart = now - start;
    const diffEnd = end - now;
    
    const oneDay = 24 * 60 * 60 * 1000;
    
    const daysPassed = Math.floor(diffStart / oneDay);
    const daysLeft = Math.ceil(diffEnd / oneDay);
    const totalDays = (end - start) / oneDay;
    
    const percentCompleted = ((daysPassed / totalDays) * 100).toFixed(2);

    const yearProgressSpan = document.getElementById('progress');
    yearProgressSpan.textContent = `${percentCompleted}% completed & ${daysLeft} days left in ${now.getFullYear()}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const deterministicSpan = document.getElementById('adjective');
    deterministicSpan.textContent = getTodayText();
    updateLocalTime();
    setInterval(updateLocalTime, 1000);
    updateYearProgress();
    setInterval(updateYearProgress, 60000);
});