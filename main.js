const inputObjs = {};
const docObjs = {};


function appInit() {
    inputObjs.inputCurStnDLOffH = document.getElementById("inputCurStnDLOffH");
    inputObjs.inputCurStnDLOffM = document.getElementById("inputCurStnDLOffM");
    inputObjs.inputCurStnULOffH = document.getElementById("inputCurStnULOffH");
    inputObjs.inputCurStnULOffM = document.getElementById("inputCurStnULOffM");

    inputObjs.inputNewStnDLOnH = document.getElementById("inputNewStnDLOnH");
    inputObjs.inputNewStnDLOnM = document.getElementById("inputNewStnDLOnM");
    inputObjs.inputNewStnULOnH = document.getElementById("inputNewStnULOnH");
    inputObjs.inputNewStnULOnM = document.getElementById("inputNewStnULOnM");

    docObjs.timeList = document.getElementById("sectionTimeList");
}

function calc() {
    /*
    * NEW BOT -45
    * NEW BOT -30
    * NEW BOT -5
    * NEW D/L ON (BOT 0)
    * NEW U/L ON
    * CUR D/L OFF (EOT)
    * CUR U/L OFF
     */

    for (const input in inputObjs) {
        console.log(input, input.value);
    }

    const trackEventTimes = {};
    const events = [];
    const date = Date.now();
    trackEventTimes.CurStnDLOff = new Date(date);
    trackEventTimes.CurStnDLOff.setHours(parseInt(inputObjs.inputCurStnDLOffH.value));
    trackEventTimes.CurStnDLOff.setMinutes(parseInt(inputObjs.inputCurStnDLOffM.value));

    trackEventTimes.CurStnULOff = new Date(date);
    trackEventTimes.CurStnULOff.setHours(parseInt(inputObjs.inputCurStnULOffH.value));
    trackEventTimes.CurStnULOff.setMinutes(parseInt(inputObjs.inputCurStnULOffM.value));

    trackEventTimes.NewStnDLOn = new Date(date);
    trackEventTimes.NewStnDLOn.setHours(parseInt(inputObjs.inputNewStnDLOnH.value));
    trackEventTimes.NewStnDLOn.setMinutes(parseInt(inputObjs.inputNewStnDLOnM.value));

    trackEventTimes.NewStnULOn = new Date(date);
    trackEventTimes.NewStnULOn.setHours(parseInt(inputObjs.inputNewStnULOnH.value));
    trackEventTimes.NewStnULOn.setMinutes(parseInt(inputObjs.inputNewStnULOnM.value));

    // console.log(trackEventTimes);

    let time = new Date(trackEventTimes.NewStnDLOn);
    events.push({'label': 'New Stn BOT -45', 'time': deltaMinutes(time,-45), 'type': 'new'});
    events.push({'label': 'New Stn BOT -30', 'time': deltaMinutes(time,-30), 'type': 'new'});
    events.push({'label': 'New Stn BOT -5', 'time': deltaMinutes(time,-5), 'type': 'new'});
    events.push({'label': 'New Stn BOT D/L ON', 'time': deltaMinutes(time,0), 'type': 'new'});
    events.push({'label': 'New Stn BOT U/L ON', 'time': new Date(trackEventTimes.NewStnULOn), 'type': 'new'});

    events.push({'label': 'Cur Stn EOT D/L OFF', 'time': new Date(trackEventTimes.CurStnDLOff), 'type': 'cur'});
    events.push({'label': 'Cur Stn U/L OFF', 'time': new Date(trackEventTimes.CurStnULOff), 'type': 'cur'});

    const sortedEvents = events.slice().sort((a,b) => a.time - b.time);
    // console.log(events);
    // console.log(sortedEvents);

    docObjs.timeList.innerHTML = "";

    for (let i = 0; i < sortedEvents.length; i++) {
        const eventLabel = document.createElement("span");
        const eventTime = document.createElement("span");
        const hh = sortedEvents[i].time.getHours().toString().padStart(2, '0');
        const mm = sortedEvents[i].time.getMinutes().toString().padStart(2, '0');

        eventLabel.className = "__label --" + sortedEvents[i].type;
        eventLabel.innerHTML = sortedEvents[i].label;
        eventTime.className = "__time";
        eventTime.innerHTML = hh + ":" + mm;

        docObjs.timeList.append(eventLabel);
        docObjs.timeList.append(eventTime);
    }
}
/*
function timeListElem(strLabel, strTime) {
    const label = document.createElement("span");
    const time = document.createElement("span"); // TODO: convert this to a hh:mm display

    label.innerHTML = strLabel;
    label.className = "time-list__label";

    time.innerHTML = strTime;
    time.className = "time-list__time";

    return [ label, time ];
}*/
