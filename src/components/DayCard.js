import React from "react";
import NewActivityForm from "./NewActivityForm";
import ActivityList from "./ActivityList";
import UserDataForm from "./UserDataForm";
import { personalizeDay } from "./helpers";

class DayCard extends React.Component {
    state = {
        dayModel: [],
        dayToRender: [],
        dayModelTotal: 0,
        defaultActivity: {
            activity: "Sleeping|40",
            activityName: "Sleeping",
            kcalPerHour: "40",
            userMultiplier: 100
        },
        userData: {      //just took it out from default activity above
            userWeight: 75,
            userSex: "man"
        },
        multiplier: 100,
    };
    sortDay = (joinedDay) => {
        let sortedDay = joinedDay.sort((a, b) => a.startTimeNumber[0] - b.startTimeNumber[0])
        return sortedDay
    }

    validateDay = (sortedDay) => {
        for (let i = 0; i < sortedDay.length - 1; i++) {
            if (sortedDay[i].finishTimeNumber[0] > sortedDay[i + 1].startTimeNumber[0]) return alert("Wrong time provided. You have to change time entries")
            if (sortedDay[i].finishTimeNumber[0] === sortedDay[i + 1].startTimeNumber[0]) {
                if (sortedDay[i].finishTimeNumber[1] > sortedDay[i + 1].startTimeNumber[1]) return alert("Wrong time's provided")
            }
        }
        console.log("valid activity")
        return sortedDay
    }

    renderIt = async () => {
        let weightDifference = this.state.userData.userWeight - 75
        let userMultiplier = 100 + (weightDifference / 0.75)
        let copyObject = JSON.parse(JSON.stringify(this.state.dayModel))
        if (this.state.userData.userSex === "woman") userMultiplier = userMultiplier * 0.97
        await this.setState({
            dayToRender: personalizeDay(this.state.dayModel, (Math.floor(userMultiplier))),
            userMultiplier: (Math.floor(userMultiplier))
        })
        await this.setState({ dayModel: copyObject })
    }

    onActivitySubmit = async (props) => {
        const newActivity = props;
        const joinedDay = await this.state.dayModel.concat(newActivity);
        let dayModelTotal = 0;
        joinedDay.map((row) => {
            dayModelTotal = dayModelTotal + row.kcalBurned;
        })
        await this.setState({ dayModel: this.validateDay(this.sortDay(joinedDay)), dayModelTotal: dayModelTotal })
        await this.setState({ dayToRender: personalizeDay(this.state.dayModel, this.state.multiplier) })
        this.renderIt()
        console.log(dayModelTotal)
    }
    onUserSubmit = async (props) => {
        await this.setState({ userData: props })
        let weightDifference = this.state.userData.userWeight - 75
        let userMultiplier = 100 + (weightDifference / 0.75)
        let copyObject = JSON.parse(JSON.stringify(this.state.dayModel))
        if (this.state.userData.userSex === "woman") userMultiplier = userMultiplier * 0.97
        await this.setState({
            dayToRender: personalizeDay(this.state.dayModel, (Math.floor(userMultiplier))),
            userMultiplier: (Math.floor(userMultiplier))
        })
        await this.setState({ dayModel: copyObject })

    }

    onGapsSubmit = (props) => {
        this.setState({ dayModel: props })
        this.renderIt()
    }

    render() {
        return (
            <div className="container pt-5" >
                <div className="">

                    <h1 className="Calorie-Demander text-center"><img src="titlepng.png" /></h1>
                    <UserDataForm
                        dayModel={this.state.dayModel}
                        wynik={this.state.wynik}
                        onFormSubmit={this.onUserSubmit}
                        onGapsSubmit={this.onGapsSubmit} />
                    <NewActivityForm onFormSubmit={this.onActivitySubmit} />
                    <ActivityList
                        wynik={this.state.dayModelTotal}
                        dayToRender={this.state.dayToRender}
                        userData={this.state.userData}
                        userMultiplier={this.state.userMultiplier}
                    />
                </div>
            </div>

        )
    }
}





export default DayCard;