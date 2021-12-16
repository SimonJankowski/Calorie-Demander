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
                activity: "Scrolling Insta|60",
                activityName: "Scrolling Insta",
                kcalPerHour: "60"
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
        if (!this.props.dayModel.length) return alert("You have to put atleast 1 activity")
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
            <div className="">
                <form className="" onSubmit={this.onFormSubmit}>
                    <div className="row" id="userdata">
                        <div className="col-12 col-md-3 col-sm-6" id="weightSelector">
                            <p className="text-center"> Select your weight: </p><select
                                type="number"
                                value={this.state.userWeight}
                                onChange={this.onSelectChange}
                                name="userWeight"
                                className="form-select"
                            >
                                {this.weightRange()}
                            </select>
                        </div>

                        <div className="col-12 col-md-3 col-sm-6" id="sexSelector">
                            <p className="text-center">Select your sex: </p>
                            <div className="form-check">
                                <input type="radio" id="man" name="sex" value="man"
                                    className="form-check-input"
                                    checked={this.state.userSex === "man"}
                                    onChange={this.onSexChange} />
                                <label htmlFor="man">Man</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" id="woman" name="sex" value="woman"
                                    className="form-check-input"
                                    checked={this.state.userSex === "woman"}
                                    onChange={this.onSexChange} />
                                <label className="form-check-label" htmlFor="woman">Woman</label>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 col-sm-6 text-center d-flex d-sm-block justify-content-evenly">
                            <button className="mr-1 przycisk">PERSONALISE</button>
                            <button type="button" onClick={this.fillUpGaps} className="przycisk">FILL UP GAPS</button>
                        </div>
                        <div className="col-12 col-md-3 col-sm-6 text-center d-flex align-items-center justify-content-center">
                            <button type="button" onClick={this.refreshPage} className="align-items-center reset">RESET</button>
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