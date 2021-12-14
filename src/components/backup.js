import React from "react";


const ActivityList = (props) => {

    const renderedList = props.dayModel.map((row) => {
        return <tr key={row.id}>
            <td data-label="activity">{row.activityName}</td>
            <td data-label="startTime">{row.startTime}</td>
            <td data-label="finishTime">{row.finishTime}</td>
            <td data-label="duration">{row.duration} minutes</td>
            <td data-label="duration" className="right aligned">{row.kcalBurned}</td>
        </tr>
    })
    let sum = 0;
    let sum2 = 0;
    props.dayModel.map((row) => sum = sum + row.kcalBurned)
    const personalize = () => {
        sum2 = sum * 1.1
    }
    return (
        <div className="component">
            <table className="ui celled table">
                <thead>
                    <tr><th>Activity</th>
                        <th>Start time</th>
                        <th>Finish time</th>
                        <th>Duration</th>
                        <th className="right aligned">kcal</th>
                    </tr></thead>
                <tbody>
                    {renderedList}
                    <tr className="active">
                        <td colSpan="2">Day intensity:{sum2}</td>
                        <td><button onClick={personalize} className="ui button red">Personalise</button></td>
                        <td colSpan="2" className="right aligned">Total kcal Burned: {sum}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default ActivityList

    fillUpDay = (day) => {
        console.log(day)
        if ((day[0].startTimeNumber[0] + day[0].startTimeNumber[1]) > 0) {
            let duration = this.calcDuration([0, 0], day[0].startTimeNumber)
            let entry = {
                activity: this.state.defaultActivity.activity,
                activityName: this.state.defaultActivity.activityName,
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
            if (day.length > 2 && day[i - 1].finishTimeNumber !== day[i].startTimeNumber) {
                console.log(`petle ${i},${day[i - 1].finishTimeNumber}, ${day[i].startTimeNumber} `, day)
                let duration = this.calcDuration(day[i - 1].finishTimeNumber, day[i].startTimeNumber)
                let entry = {
                    activity: i,
                    activityName: this.state.defaultActivity.activityName,
                    id: new Date().getTime(),
                    duration: duration,
                    kcalBurned: Math.floor((duration * 40) / 60),
                    startTime: day[i - 1].finishTime,
                    finishTime: day[i].startTime,
                    startTimeNumber: day[i - 1].finishTimeNumber,
                    finishTimeNumber: day[i].startTimeNumber
                }
                day.splice(i, 0, entry)
                console.log(day)
            }
        }
        return day
    }