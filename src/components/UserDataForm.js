import React from 'react'
import { fillUpDay } from './helpers.js'

class UserDataForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userWeight: 75,
            userSex: "man",
            personalizedCalories: 0,
            defaultActivity: {
                activity: "Sleeping|40",
                activityName: "wklejone",
                kcalPerHour: "40"
            }

        }
    }
    // state = {
    //     userWeight: 75,
    //     userSex: "man",
    //     personalizedCalories: 0,
    //     defaultActivity: ""
    // }
    fillUpGaps = async (event) => {
        if (!this.props.dayModel.length) return console.log("You have to put atleast 1 activity")
        await this.setState({ dayModel: fillUpDay(this.props.dayModel, this.state.defaultActivity) })
        console.log(this.state.dayModel)
        this.props.onGapsSubmit(this.props.dayModel)
    }
    weightRange = () => {
        const array = [];
        for (let i = 40; i < 200; i++) {
            array.push(<option key={i} value={i}>{i} kgs</option>);
        }
        return array
    }
    onSelectChange = async (event) => {
        await this.setState({ userWeight: event.target.value })
        console.log(this.state.userWeight)
    }
    onSexChange = async (event) => {
        await this.setState({ userSex: event.target.value })
        console.log(this.state.userSex)
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const userData = { ...this.state };
        this.props.onFormSubmit(userData);
    }

    onDefaultActivityChange = async (event) => {
        await this.setState({ defaultActivity: event.target.value })
    }
    refreshPage = () => {
        window.location.reload();
    }
    render() {
        return (
            <div className="component">
                <form className="ui form" onSubmit={this.onFormSubmit}>
                    <div className="fields" id="userdata">
                        <div className="four wide field" id="weightSelector">
                            Select your weight: <select
                                type="number"
                                value={this.state.userWeight}
                                onChange={this.onSelectChange}
                                name="userWeight"
                                className="ui fluid dropdown"
                            >
                                {this.weightRange()}
                            </select>
                        </div>

                        <div className="three wide field" id="sexSelector">
                            <p>Select your sex: </p>
                            <div>
                                <input type="radio" id="man" name="sex" value="man"
                                    checked={this.state.userSex === "man"}
                                    onChange={this.onSexChange} />
                                <label htmlFor="man">Man</label>
                            </div>
                            <div>
                                <input type="radio" id="woman" name="sex" value="woman"
                                    checked={this.state.userSex === "woman"}
                                    onChange={this.onSexChange} />
                                <label htmlFor="woman">Woman</label>
                            </div>
                        </div>
                        <div className="four wide field">
                            <button className="przycisk">PERSONALISE</button>
                        </div>

                        <div className="four wide field">
                            <button type="button" onClick={this.fillUpGaps} className="przycisk">FILL UP GAPS</button>
                        </div>
                        <div className="four wide field">
                            <button type="button" onClick={this.refreshPage} className="przycisk">RESET</button>
                        </div>
                        {/* <div className="five wide field">
                            Choose default Activity:<select disabled value={this.state.defaultActivity} onChange={this.onDefaultActivityChange} name="activity" className="ui fluid dropdown">
                                <option value="" disabled>Activity</option>
                                <option value="Sleeping|40">Sleeping</option>
                                <option value="Watching TV|79">Watching TV</option>
                                <option value="Walking|120">Walking</option>
                                <option value="Running|600">Running</option>
                            </select>
                        </div> */}
                    </div>
                </form>

            </div>
        )
    }
}

export default UserDataForm