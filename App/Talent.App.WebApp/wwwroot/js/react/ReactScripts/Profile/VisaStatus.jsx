import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Dropdown } from 'semantic-ui-react';
import moment from 'moment/moment.js'

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.onChangeVisaExpiry = this.onChangeVisaExpiry.bind(this);
    }


    handleChange(name, value) {
        if (value === "" || value == null) {
            TalentUtil.notification.show("Please select a visa status", "error")
        } else {
            console.log(value);
            this.props.updateProfileData({ [name]: value })
        }
    }

    onChangeVisaExpiry(name) {
        var data = event.target.value;
        this.props.updateProfileData({
            [name]: data
        })
        console.log(data)
    }

    saveVisaStatus(type, expiry) {
        this.props.saveProfileData({
            visaStatus: type,
            visaExpiryDate: expiry
        })
    }


    render() {

        const visaStatusOptions = [
            {
                key: 'Citizen',
                text: 'Citizen',
                value: 'Citizen',
            },
            {
                key: 'Permanent Resident',
                text: 'Permanent Resident',
                value: 'Permanent Resident',
            },
            {
                key: 'Work Visa',
                text: 'Work Visa',
                value: 'Work Visa',
            },
            {
                key: 'Student Visa',
                text: 'Student Visa',
                value: 'Student Visa',
            },
        ]

        return (
            <React.Fragment>
                <div className='ui sixteen wide column'>
                    <div className='fields'>
                        <div className="six wide field">
                            <label>Visa type</label>
                            <Dropdown
                                placeholder='Select your visa status'
                                fluid
                                selection
                                search
                                value={this.props.visaStatus}
                                options={visaStatusOptions}
                                onChange={(event, { name, value }) => this.handleChange('visaStatus', value)}
                            />
                        </div>
                        {this.props.visaStatus == "Work Visa" || this.props.visaStatus == "Student Visa"
                            ?
                            <React.Fragment>
                                <div className="ui six wide field">
                                    <label>Visa expiry date</label>
                                    <input type="date" placeholder="Please provide visa expiry date" value={moment(this.props.visaExpiryDate).format("YYYY-MM-DD")} onChange={() => this.onChangeVisaExpiry('visaExpiryDate')} />
                                </div>
                                <div className="ui four wide field buttonStyleDiv">
                                    <button type="button" className="ui teal button buttonStyle" onClick={() => this.saveVisaStatus(this.props.visaStatus, moment(this.props.visaExpiryDate).format("YYYY-MM-DD"))}>Save</button>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </React.Fragment>
        )

    }
}