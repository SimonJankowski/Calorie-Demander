import React from "react";
import { fillUpDay } from "./helpers";

class ActivityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayModel: [],
            dayToRender: [],
            renderedList: [],
            dayModelTotal: 0,
            userMultiplier: 100,
            defaultActivity: {
                activity: "Sleeping|40",
                activityName: "Sleeping",
                kcalPerHour: "40"
            }
        }
    }
    renderList = () => this.props.dayToRender.map((row) => {
        return <tr key={row.id}>
            <td data-label="activity">{row.activityName}</td>
            <td data-label="startTime">{row.startTime}</td>
            <td data-label="finishTime">{row.finishTime}</td>
            <td data-label="duration">{row.duration} minutes</td>
            <td data-label="duration" className="text-end">{row.kcalBurned}</td>
        </tr>
    })
//     this.setState({ wynik: this.acumulate })
// fillUpGaps = (event) => {
//     if (!this.props.dayModel.length) return console.log("za ktrotki dzien")
//     this.setState({ dayModel: fillUpDay(this.props.dayModel, this.state.defaultActivity) })
//     console.log(this.state.dayModel)
// }
acumulate = () => {
    let sum = 0;
    console.log(this.props.dayToRender[0])
    if (!this.props.dayToRender.length) return console.log("za ktrotki dzien")
    this.props.dayToRender.forEach((row) => sum = sum + row.kcalBurned)
    console.log(this.props.dayToRender[0])
    return Math.floor(sum)

}

render() {
    return (
        <div className="component">
            <table className="table table-bordered border-dark">
                <thead>
                    <tr><th scope="col">Activity</th>
                        <th scope="col">Start time</th>
                        <th scope="col">Finish time</th>
                        <th scope="col">Duration</th>
                        <th className="right aligned">kcal</th>
                    </tr></thead>
                <tbody>
                    {this.renderList()}
                    <tr className="table-danger">
                        <td colSpan="3" className="left aligned">	&reg; Simon Jankowski </td>
                        <td className="table-danger text-end" colSpan="2">Actual kcal demand: {this.acumulate()}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
}

export default ActivityList