const hoursHand = document.querySelector('.hour-hand');
const minutesHand = document.querySelector('.min-hand');
const secondsHand = document.querySelector('.second-hand');
const numericTimeElement = document.getElementById('numeric-time');
const timezoneSelect = document.getElementById('timezone-select');
const showNumericTimeCheckbox = document.getElementById('show-numeric-time');

function populateTimezones() {
    const timezones = Intl.supportedValuesOf('timeZone');
    timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz.replace('_', ' ');
        timezoneSelect.appendChild(option);
    });
    const localOption = document.createElement('option');
    localOption.value = 'local';
    localOption.textContent = 'Local Time';
    timezoneSelect.prepend(localOption);
    timezoneSelect.value = 'local';
}

function setHour(now) {
    const hours = now.getHours();
    const hoursDegree = ((hours / 12) * 360) + 90;
    hoursHand.style.transform = `rotate(${hoursDegree}deg)`;
}

function setMinute(now) {
    const minutes = now.getMinutes();
    const minutesDegree = ((minutes / 60) * 360) + 90;
    minutesHand.style.transform = `rotate(${minutesDegree}deg)`; 
}

function setSecond(now) {
    const seconds = now.getSeconds();
    const secondsDegree = ((seconds / 60) * 360) + 90;
    secondsHand.style.transform = `rotate(${secondsDegree}deg)`;
}

function setDate() {
    let now = new Date();
    const timezone = timezoneSelect.value;
    if (timezone !== 'local') {
        now = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    }
    setMinute(now);
    setHour(now);
    setSecond(now);
    if (showNumericTimeCheckbox.checked) {
        numericTimeElement.textContent = now.toLocaleTimeString();
    } else {
        numericTimeElement.textContent = '';
    }
}

function toggleSettingsPanel() {
    const settingsPanel = document.querySelector('.settings-panel');
    if (settingsPanel.style.display === 'none' || settingsPanel.style.display === '') {
        settingsPanel.style.display = 'block';
    } else {
        settingsPanel.style.display = 'none';
    }
}

function saveSettings() {
    setDate();
    toggleSettingsPanel();
}

timezoneSelect.addEventListener('change', setDate);
showNumericTimeCheckbox.addEventListener('change', setDate);

populateTimezones();
setInterval(setDate, 1000);
setDate();
