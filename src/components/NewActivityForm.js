import React from "react";
import { calcDuration } from "./helpers";

class NewActivityForm extends React.Component {

    state = {
        activity: "Sleeping|40",
        activityName: "Sleeping",
        kcalPerHour: 40,
        startTime: "00:00",
        finishTime: "07:00",
        startTimeNumber: [0, 0],
        finishTimeNumber: [7, 0],
    }

    validateEntry = () => {
        if (this.state.startTimeNumber[0] > this.state.finishTimeNumber[0]) return false;
        if (this.state.startTimeNumber[0] === this.state.finishTimeNumber[0] && this.state.startTimeNumber[1] >= this.state.finishTimeNumber[1]) return false;
        if (this.state.kcalPerHour <= 0) return false
        return true
    }

    onFormSubmit = async (event) => {   //The reason it's async it's because
        event.preventDefault();
        await this.setState({
            startTimeNumber: [parseInt((this.state.startTime.split(":"))[0]), parseInt((this.state.startTime.split(":"))[1])],
            finishTimeNumber: [parseInt((this.state.finishTime.split(":"))[0]), parseInt((this.state.finishTime.split(":"))[1])],
        });
        if (this.validateEntry() === false) return alert("Wrong time provided. You have to change time entries");
        let duration = await calcDuration(this.state.startTimeNumber, this.state.finishTimeNumber)
        let kcalBurned = await Math.floor((this.state.kcalPerHour * duration) / 60)
        const entry = {
            id: new Date().getTime(),
            duration,
            kcalBurned,
            ...this.state
        }
        this.props.onFormSubmit(entry)
        this.setState({ startTime: entry.finishTime })    //sorely for user experience
    }

    onSelectChange = async (event) => {
        let activityArray = event.target.value.split("|")
        await this.setState({
            activity: event.target.value,
            activityName: activityArray[0],
            kcalPerHour: activityArray[1]
        })
    }

    onStartChange = (event) => {
        this.setState({ startTime: event.target.value })
    }
    onFinishChange = (event) => {
        this.setState({ finishTime: event.target.value })
    }

    render() {
        return (
            <div className="component">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-5 col-sm-6">
                            Choose:<select value={this.state.activity} onChange={this.onSelectChange} name="activity" className="form-select">
                                <option value="" disabled>Activity</option>
                                <option value="Sleeping|40">Sleeping</option>
                                <option value="Watching TV|70">Watching TV</option>
                                <option value="Scrolling Insta|71">Scrolling Insta</option>
                                <option value="Work: Light office work|120">Work: Light office work</option>
                                <option value="Standing|130">Standing</option>
                                <option value="Cooking|165">Cooking</option>
                                <option value="Washing Car|210">Washing Car</option>
                                <option value="Yoga|240">Yoga</option>
                                <option value="Walking|245">Walking</option>
                                <option value="Weight training: light|250">Weight training: light</option>
                                <option value="Work: Electrical work|280">Work: Electrical work</option>
                                <option value="Work: Carpentry|290">Work: Carpentry</option>
                                <option value="Weight training: intense|340">Weight training: intense</option>
                                <option value="Dancing|350">Dancing</option>
                                <option value="Light Areobics|360">Light Areobics</option>
                                <option value="Work: Construction|450">Work: Construction</option>
                                <option value="Sex|455">Sex</option>
                                <option value="Skipping Rope|513">Skipping Rope</option>
                                <option value="Playing Football|550">Playing Football</option>
                                <option value="Running (8km/h)|560">Running (8km/h)</option>
                                <option value="Running (10km/h)|720">Running (10km/h)</option>
                                <option value="Running (12km/h)|960">Running (12km/h)</option>
                                <option value="Running (15km/h)|1060">Running (15km/h)</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-2 col-sm-6">
                            Start:<input className="form-control timepicker" value={this.state.startTime} name="startTime" onChange={this.onStartChange} type="time" min="00:00" max="23:59" required />
                        </div>
                        <div className="fcol-12 col-md-2 col-sm-6">
                            Finish<input className="form-control timepicker" value={this.state.finishTime} name="finishTime" onChange={this.onFinishChange} type="time" min="00:01" max="24:00" required />
                        </div>
                        <div className="col-12 col-md-3 col-sm-6 d-flex align-items-center justify-content-center">
                            <button className="przycisk">ADD ACTIVITY</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}



export default NewActivityForm;