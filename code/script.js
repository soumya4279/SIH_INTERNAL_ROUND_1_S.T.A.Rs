let alarms = [];
let alarmTimeouts = [];
let isAlarmRinging = false;

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const dateString = now.toLocaleDateString();
    const temp = "138°F"; // Replace this with real data if needed.

    document.getElementById('time').innerText = timeString;
    document.getElementById('date-temp').innerText = `${dateString} ${temp}`;
    
    checkAlarms(timeString);
}


function setAlarm() {
    const alarmInput = document.getElementById('alarm-time').value;
    if (alarmInput) {
        const alarmTime = alarmInput + ":00";
        alarms.push(alarmTime);
        displayAlarms();
        document.getElementById('alarm-status').innerText = `Alarm set for ${alarmInput}`;
    }
}

function checkAlarms(currentTime) {
    alarms.forEach((alarmTime, index) => {
        if (currentTime === alarmTime && !isAlarmRinging) {
            soundAlarm(index);
        }
    });
}

function soundAlarm(index) {
    const alarmAudio = document.getElementById('alarm-audio');
    alarmAudio.loop = true; // Loop the audio continuously
    alarmAudio.play(); // Start playing the audio
    isAlarmRinging = true;
    document.getElementById('alarm-status').innerText = `Alarm ringing! ${alarms[index]}`;
}

function snoozeAlarm() {
    if (isAlarmRinging) {
        const alarmAudio = document.getElementById('alarm-audio');
        alarmAudio.pause(); // Pause the audio
        alarmAudio.currentTime = 0; // Reset audio to start
        isAlarmRinging = false;

        setTimeout(() => soundAlarm(0), 300000); // Snooze for 5 minutes
        document.getElementById('alarm-status').innerText = "Snoozed for 5 minutes";
    }
}

function stopAlarm() {
    if (isAlarmRinging) {
        const alarmAudio = document.getElementById('alarm-audio');
        alarmAudio.pause(); // Stop the audio
        alarmAudio.currentTime = 0; // Reset audio to start
        isAlarmRinging = false;
    }

    alarms = []; // Clear all alarms
    document.getElementById('alarm-status').innerText = "Alarm stopped";
    displayAlarms();
}

function displayAlarms() {
    const alarmList = document.getElementById('alarm-list');
    alarmList.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const alarmItem = document.createElement('div');
        alarmItem.className = 'alarm-item';
        alarmItem.innerText = `Alarm ${index + 1}: ${alarm}`;
        alarmList.appendChild(alarmItem);
    });
}

document.getElementById('set-alarm').addEventListener('click', setAlarm);
document.getElementById('snooze-alarm').addEventListener('click', snoozeAlarm);
document.getElementById('stop-alarm').addEventListener('click', stopAlarm);

setInterval(updateTime, 1000);
