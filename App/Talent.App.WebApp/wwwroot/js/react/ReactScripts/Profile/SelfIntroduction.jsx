/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        this.updateSummaryDescription = this.updateSummaryDescription.bind(this)
        this.saveField = this.saveField.bind(this)
    }

    updateSummaryDescription(event) {
        const data = {}
        data[event.target.name] = event.target.value
        this.props.updateWithoutSave(data)
    }

    saveField() {
        const data = {}
        data.summary = this.props.summary
        data.description = this.props.description
        const found = Object.values(data).find(value => value.trim() === "")
        if (found === undefined) {
            this.props.updateProfileData(data)
        } else {
            TalentUtil.notification.show("Please enter correct summary and description", "error")
        }
    }

    render() {
        const summary = this.props.summary ? this.props.summary : ''
        const description = this.props.description ? this.props.description : ''
        return (
            <div className="ui sixteen wide column">
                <div className="row">
                    <input
                        type="text"
                        name="summary"
                        placeholder="Please provide a short summary about yourself"
                        value={summary}
                        onChange={this.updateSummaryDescription}
                    />
                    <br />
                    <p>Summary must be no more than 150 characters.</p>
                </div>
                <br />
                <div className="row">
                    <textarea
                        placeholder={`Please tell us about any hobbies, additional expertise, or anything else you'd like to add.`}
                        name="description"
                        value={description}
                        onChange={this.updateSummaryDescription}
                    />
                    <p>Description must be between 150-600 characters.</p>
                </div>
                <br />
                <button type="button" className="ui right floated teal button" onClick={this.saveField}>Save</button>
            </div>
        )
    }
}



