/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Icon } from 'semantic-ui-react';
import moment from 'moment/moment.js'

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        const currentExperience = props.experienceData

        this.state = {
            displayAddExperience: false,
            id: "",
            company: "",
            position: "",
            responsibilities: "",
            start: "",
            end: "",
            displayUpdateExperience: false
        }

        this.displayAdd = this.displayAdd.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
        this.displayUpdateExperience = this.displayUpdateExperience.bind(this);
        this.closeUpdate = this.closeUpdate.bind(this);
        this.addExperience = this.addExperience.bind(this);
        this.onChangeTextField = this.onChangeTextField.bind(this);
        this.updateExperience = this.updateExperience.bind(this);
    };

    displayAdd() {

        const currentExperience = this.props.experienceData
        this.setState({
            displayAddExperience: true,
            newExperience: currentExperience,
            company: "",
            position: "",
            responsibilities: "",
            start: "",
            end: "",
        })
    }

    closeAdd() {
        this.setState({
            displayAddExperience: false,
        })
    }

    displayUpdateExperience(id, company, position, responsibilities, start, end) {
        const data = this.props.experienceData
        this.setState({
            displayUpdateExperience: true,
            newExperience: data,
            updateId: id,
            company: company,
            position: position,
            responsibilities: responsibilities,
            start: start,
            end: end
        })
        console.log(this.state.start)
    }

    closeUpdate() {
        this.setState({
            displayUpdateExperience: false,
        })
    }

    addExperience() {
        let company = this.state.company
        let position = this.state.position
        let start = this.state.start
        let end = this.state.end
        let responsibilities = this.state.responsibilities
        this.state.newExperience.push({ company, position, start, end, responsibilities })
        var data = Object.assign([], this.state.newExperience)
        this.props.updateProfileData(data)
        this.closeAdd()
    }

    onChangeTextField(name) {
        var data = event.target.value;
        this.setState({
            [name]: data
        })
    }

    deleteExperience(id) {
        let data = this.props.experienceData
        const deleteId = data.findIndex(x => x.id == id)
        data.splice(deleteId, 1)
        this.props.updateProfileData(data)
    }


    updateExperience(id) {
        let data = this.state.newExperience
        const updateId = data.findIndex(x => x.id == id)
        data[updateId].company = this.state.company
        data[updateId].position = this.state.position
        data[updateId].start = this.state.start
        data[updateId].end = this.state.end
        data[updateId].responsibilities = this.state.responsibilities
        this.props.updateProfileData(data)
        this.closeUpdate()
    }


    render() {

        let display = null
        if (this.state.displayAddExperience) {
            display =
                <div className='ui sixteen wide column'>
                    <div className="fields">
                        <div className="ui eight wide field">
                            <label>Company:</label>
                            <input type="text" placeholder="Company" value={this.state.company} onChange={() => this.onChangeTextField('company')} />
                        </div>
                        <div className="ui eight wide field">
                            <label>Position:</label>
                            <input type="text" placeholder="position" value={this.state.position} onChange={() => this.onChangeTextField('position')} />
                        </div>
                    </div>
                    <div className="fields">
                        <div className="ui eight wide field">
                            <label>Start Date:</label>
                        <input type="date" placeholder="Start Date" value={this.state.start} onChange={() => this.onChangeTextField('start')} />
                        </div>
                        <div className="ui eight wide field">
                            <label>End Date:</label>
                            <input type="date" placeholder="End Date" value={this.state.end} onChange={() => this.onChangeTextField('end')} />
                        </div>
                    </div>
                    <div className="fields">
                        <div className="ui sixteen wide field">
                            <label>Resposnsibilities:</label>
                            <input type="text" placeholder="Resposnsibilities" value={this.state.responsibilities} onChange={() => this.onChangeTextField('responsibilities')} />
                        </div>
                    </div>
                    <div className="ui four wide column">
                        <button type="button" className="ui teal button" onClick={this.addExperience}>Add</button>
                        <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                    </div>
                </div>
        }


        let serviceList = this.props.experienceData;
        let tableData = null;
        if (serviceList != "") {
            tableData = serviceList.map((service, index) =>
                <tr key={index}>
                    {this.state.displayUpdateExperience && service.id == this.state.updateId
                        ? <React.Fragment>
                            <td colSpan='6'>
                                <div className="fields">
                                    <div className="ui eight wide field">
                                        <label>Company:</label>
                                        <input type="text" placeholder="Company" value={this.state.company} onChange={() => this.onChangeTextField('company')} />
                                    </div>
                                    <div className="ui eight wide field">
                                        <label>Position:</label>
                                        <input type="text" placeholder="position" value={this.state.position} onChange={() => this.onChangeTextField('position')} />
                                    </div>
                                </div>
                                <div className="fields">
                                    <div className="ui eight wide field">
                                        <label>Start Date:</label>
                                        <input type="date" placeholder="Start Date" value={moment(this.state.start).format("YYYY-MM-DD")} onChange={() => this.onChangeTextField('start')} />
                                    </div>
                                    <div className="ui eight wide field">
                                        <label>End Date:</label>
                                        <input type="date" placeholder="End Date" value={moment(this.state.end).format("YYYY-MM-DD")} onChange={() => this.onChangeTextField('end')} />
                                    </div>
                                </div>
                                <div className="fields">
                                    <div className="ui sixteen wide field">
                                        <label>Resposnsibilities:</label>
                                        <input type="text" placeholder="Resposnsibilities" value={this.state.responsibilities} onChange={() => this.onChangeTextField('responsibilities')} />
                                    </div>
                                </div>
                                <div className="ui four wide column">
                                    <button type="button" className="ui teal button" onClick={() => this.updateExperience(service.id)}>Update</button>
                                    <button type="button" className="ui button" onClick={this.closeUpdate}>Cancel</button>
                                </div>
                            </td>
                        </React.Fragment>
                        : <React.Fragment>
                            <td>{service.company}</td>
                            <td>{service.position}</td>
                            <td>{service.responsibilities}</td>
                            <td>{moment(service.start).format("Do MMM, YYYY")}</td>
                            <td>{moment(service.end).format("Do MMM, YYYY")}</td>
                            <td>
                                <span className='tdFloatRight'>
                                    <Icon name="pencil" onClick={this.displayUpdateExperience.bind(this, service.id, service.company, service.position, service.responsibilities, service.start, service.end)} />
                                    <Icon name="cancel" onClick={() => this.deleteExperience(service.id)} />
                                </span>
                            </td>
                        </React.Fragment>
                    }

                </tr>
            )
        }



        return (
            <React.Fragment>
                {display}
                <div className="ui sixteen wide column">
                    <table className="ui striped fixed table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Position</th>
                                <th>Responsabilities</th>
                                <th>Start</th>
                                <th>End</th>
                                <th><button type="button" className="ui right floated teal button" onClick={this.displayAdd}>+ Add New</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>

            </React.Fragment>
        )


    }
}
