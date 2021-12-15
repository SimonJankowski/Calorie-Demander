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
        if (this.validateEntry() === false) return console.log("wrong form entries provided");
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
                    <div className="fields">
                        <div className="six wide field">
                            Choose:<select value={this.state.activity} onChange={this.onSelectChange} name="activity" className="ui fluid dropdown">
                                <option value="" disabled>Activity</option>
                                <option value="Sleeping|40">Sleeping</option>
                                <option value="Watching TV|79">Watching TV</option>
                                <option value="Standing|130">Standing</option>
                                <option value="Yoga|240">Yoga</option>
                                <option value="Walking|300">Walking</option>
                                <option value="Dancing|350">Dancing</option>
                                <option value="Sex|455">Sex</option>
                                <option value="Playing Football|550">Playing Football</option>
                                <option value="Running|770">Running</option>
                            </select>
                        </div>
                        <div className="four wide field">
                            Start:<input value={this.state.startTime} name="startTime" onChange={this.onStartChange} type="time" min="00:00" max="23:59" required />
                        </div>
                        <div className="four wide field">
                            Finish<input value={this.state.finishTime} name="finishTime" onChange={this.onFinishChange} type="time" min="00:01" max="24:00" required />
                        </div>
                        <button className="przycisk">Add</button>

                    </div>
                </form>
            </div>
        )
    }
}



export default NewActivityForm;