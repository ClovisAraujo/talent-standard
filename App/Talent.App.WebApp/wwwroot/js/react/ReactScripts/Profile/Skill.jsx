/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Icon, Dropdown } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        const currentSkills = props.skillData

        this.state = {
            displayAddSkill: false,
            newSkills: currentSkills,
            updateId: "",
            name: "",
            level: "",
            displayUpdateSkill: false

        }

        this.displayAdd = this.displayAdd.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
        this.displayUpdateSkill = this.displayUpdateSkill.bind(this);
        this.closeUpdate = this.closeUpdate.bind(this);
        this.onChangeTextField = this.onChangeTextField.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
        this.updateSkill = this.updateSkill.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.handleChangeLevel = this.handleChangeLevel.bind(this);
      
    };


    displayAdd() {
        const data = this.props.skillData
        this.setState({
            displayAddSkill: true,
            newSkills: data,
            name: "",
            level: ""
        })
    }

    closeAdd() {
        this.setState({
            displayAddSkill: false,
        })
    }

    displayUpdateSkill(id, name, level) {
        const data = this.props.skillData
        this.setState({
            displayUpdateSkill: true,
            newSkills: data,
            updateId: id,
            name: name,
            level: level
        })
        //console.log('data ' + data)
        //console.log('id ' + this.state.updateId)
        //console.log('data ' + this.state.newSkills)
        //console.log('name ' + this.state.name)
        //console.log('level ' + this.state.level)
    }

    closeUpdate() {
        this.setState({
            displayUpdateSkill: false,
        })
    }

    onChangeTextField() {
        var data = event.target.value;
        this.setState({
            name: data
        })
    }

    deleteSkill(id) {
        let data = this.props.skillData
        const deleteId = data.findIndex(x => x.id == id)
        data.splice(deleteId, 1)
        this.props.updateProfileData(data)
    }

    updateSkill(id) {
        let data = this.state.newSkills
        console.log('test ' + id)
        console.log('test ' + data)
        console.log('test ' + this.state.newSkills)
        const updateId = data.findIndex(x => x.id == id)
        data[updateId].name = this.state.name
        data[updateId].level = this.state.level
        this.props.updateProfileData(data)
        this.closeUpdate()
    }

    addSkill() {
        let name = this.state.name
        let level = this.state.level
        this.state.newSkills.push({ name, level })
        var data = Object.assign([], this.state.newSkills)
        this.props.updateProfileData(data)
        this.closeAdd()
    }


    handleChangeLevel(data) {
        this.setState({
            level: data
        })
    }

    render() {

        const skillLevels = [
            {
                key: 'Beginner',
                text: 'Beginner',
                value: 'Beginner',
            },
            {
                key: 'Intermediate',
                text: 'Intermediate',
                value: 'Intermediate',
            },
            {
                key: 'Expert',
                text: 'Expert',
                value: 'Expert',
            },
        ]

        let display = null
        if (this.state.displayAddSkill) {
            display = <div className="row">
                <div className="ui five wide column">
                    <input placeholder="Add Skill" value={this.state.name} onChange={this.onChangeTextField} />
                </div>
                <div className="ui five wide column">
                    <Dropdown
                        placeholder='Skill Level'
                        fluid
                        selection
                        search
                        options={skillLevels}
                        onChange={(event, { name, value }) => this.handleChangeLevel(value)}
                    />
                </div>
                <div className="ui four wide column">
                    <button type="button" className="ui teal button" onClick={this.addSkill}>Add</button>
                    <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                </div>
            </div>
        }

        let serviceList = this.props.skillData;
        let tableData = null;
        { console.log(this.state.displayUpdateSkill) }
        if (serviceList != "") {
            tableData = serviceList.map((service, index) =>
                <tr key={index}>
                    {this.state.displayUpdateSkill && service.id == this.state.updateId
                        ? <React.Fragment>
                            <td className="five wide column">
                                <input placeholder="Update Skill" value={this.state.name} onChange={this.onChangeTextField} />
                            </td>
                            <td className="five wide column">

                                <Dropdown
                                    placeholder='Skill Level'
                                    fluid
                                    selection
                                    search
                                    value={this.state.level}
                                    options={skillLevels}
                                    onChange={(event, { name, value }) => this.handleChangeLevel(value)}
                                />
                            </td>
                            <td className="six wide column">
                                <button type="button" className="ui basic blue button" onClick={() => this.updateSkill(service.id)}>Update</button>
                                <button type="button" className="ui basic red button" onClick={this.closeUpdate}>Cancel</button>
                            </td>
                        </React.Fragment>
                        : <React.Fragment>
                            <td className="five wide column">{service.name}</td>
                            <td className="five wide column">{service.level}</td>
                            <td className="six wide column">
                                <span className='tdFloatRight'>
                                    <Icon name="pencil" onClick={this.displayUpdateSkill.bind(this, service.id, service.name, service.level)} />
                                    <Icon name="cancel" onClick={() => this.deleteSkill(service.id)} />
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

                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th>Skill</th>
                                <th>Level</th>
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

