export const personalizeDay = (day, multiplier) => {
        day.map((row) => {
            row.kcalBurned = Math.floor(row.kcalBurned * (multiplier / 100))
        })
        return day
    }

export const calcDuration = (startTimeNumber, finishTimeNumber) => {
    let hours = finishTimeNumber[0] - startTimeNumber[0];
    let minutes = finishTimeNumber[1] - startTimeNumber[1];
    let totalMinutes = hours * 60 + minutes
    return totalMinutes;
}

export const fillUpDay = (day, defaultActivity) => {
    //console.log(day)
    if ((day[0].startTimeNumber[0] + day[0].startTimeNumber[1]) > 0) {
        let duration = calcDuration([0, 0], day[0].startTimeNumber)
        let entry = {
            activity: defaultActivity.activity,
            activityName: defaultActivity.activityName,
            id: new Date().getTime(),
            duration: duration,
            kcalBurned: Math.floor((duration * 40) / 60),
            startTime: "00:00",
            finishTime: day[0].startTime,
            startTimeNumber: [0, 0],
            finishTimeNumber: day[0].startTimeNumber
        }
        day.unshift(entry)
    }
    for (let i = 1; i < day.length; i++) {
        //console.log(`petle ${i}, ${day[i - 1].finishTimeNumber}, ${day[i].startTimeNumber} `, day)
        //console.log(`petle ${i},${day[i - 1].finishTime!==day[i].startTime} `, day)
        if (day.length > 2 && day[i - 1].finishTime !== day[i].startTime) {

            let duration = calcDuration(day[i - 1].finishTimeNumber, day[i].startTimeNumber)
            let entry = {
                activity: defaultActivity.activity,
                activityName: defaultActivity.activityName,
                id: new Date().getTime(),
                duration: duration,
                kcalBurned: Math.floor((duration * 40) / 60),
                startTime: day[i - 1].finishTime,
                finishTime: day[i].startTime,
                startTimeNumber: day[i - 1].finishTimeNumber,
                finishTimeNumber: day[i].startTimeNumber
            }
            day.splice(i, 0, entry)
        }
    }
    if ((day[day.length - 1].finishTimeNumber[0] + day[day.length - 1].finishTimeNumber[1]) !== 82) {
        let duration = calcDuration(day[day.length - 1].finishTimeNumber, [23, 59])
        let entry = {
            activity: defaultActivity.activity,
            activityName: defaultActivity.activityName,
            id: new Date().getTime(),
            duration: duration,
            kcalBurned: Math.floor((duration * 40) / 60),
            startTime: day[day.length - 1].finishTime,
            finishTime: "23:59",
            startTimeNumber: day[day.length - 1].finishTimeNumber,
            finishTimeNumber: [23, 59]
        }
        day.push(entry)
    }
    return day
}
