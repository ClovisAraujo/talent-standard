/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Icon, Dropdown } from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        const currentLanguages = props.languageData

        this.state = {
            displayAddLanguage: false,
            newLanguages: currentLanguages,
            updateId: "",
            language: "",
            level: "",
            displayUpdateLanguage: false

        }

        this.displayAdd = this.displayAdd.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
        this.displayUpdateLanguage = this.displayUpdateLanguage.bind(this);
        this.closeUpdate = this.closeUpdate.bind(this);
        this.onChangeTextField = this.onChangeTextField.bind(this);
        this.deleteLanguage = this.deleteLanguage.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.addLanguage = this.addLanguage.bind(this);
        this.handleChangeLevel = this.handleChangeLevel.bind(this);
    };


    displayAdd() {
        const data = this.props.languageData
        this.setState({
            displayAddLanguage: true,
            newLanguages: data,
            language: "",
            level: ""
        })
    }

    closeAdd() {
        this.setState({
            displayAddLanguage: false,
        })
    }

    displayUpdateLanguage(id, language, level) {
        const data = this.props.languageData
        this.setState({
            displayUpdateLanguage: true,
            newLanguages: data,
            updateId: id,
            language: language,
            level: level
        })
        //console.log('data ' + data)
        //console.log('id ' + this.state.updateId)
        //console.log('data ' + this.state.newLanguages)
        //console.log('language ' + this.state.language)
        //console.log('level ' + this.state.level)
    }

    closeUpdate() {
        this.setState({
            displayUpdateLanguage: false,
        })
    }

    onChangeTextField() {
        var data = event.target.value;
        this.setState({
            language: data
        })
    }

    deleteLanguage(id) {
        let data = this.props.languageData
        const deleteId = data.findIndex(x => x.id == id)
        data.splice(deleteId, 1)
        this.props.updateProfileData(data)
    }

    updateLanguage(id) {
        let data = this.state.newLanguages
        console.log('test ' + data)
        const updateId = data.findIndex(x => x.id == id)
        data[updateId].name = this.state.language
        data[updateId].level = this.state.level
        this.props.updateProfileData(data)
        this.closeUpdate()
    }

    addLanguage() {
        let name = this.state.language
        let level = this.state.level
        this.state.newLanguages.push({ name, level })
        var data = Object.assign([], this.state.newLanguages)
        this.props.updateProfileData({ languages: data })
        this.closeAdd()
    }


    handleChangeLevel(data) {
        this.setState({
            level: data
        })
    }

    render() {

        const languageLevels = [
            {
                key: 'Basic',
                text: 'Basic',
                value: 'Basic',
            },
            {
                key: 'Conversational',
                text: 'Conversational',
                value: 'Conversational',
            },
            {
                key: 'Fluent',
                text: 'Fluent',
                value: 'Fluent',
            },
            {
                key: 'Native/Bilingual',
                text: 'Native/Bilingual',
                value: 'Native/Bilingual',
            },
        ]

        let display = null
        if (this.state.displayAddLanguage) {
            display = <div className="row">
                <div className="ui five wide column">
                    <input placeholder="Add Language" value={this.state.language} onChange={this.onChangeTextField} />
                </div>
                <div className="ui five wide column">
                    <Dropdown
                        placeholder='Language Level'
                        fluid
                        selection
                        search
                        options={languageLevels}
                        onChange={(event, { name, value }) => this.handleChangeLevel(value)}
                    />
                </div>
                <div className="ui four wide column">
                    <button type="button" className="ui teal button" onClick={this.addLanguage}>Add</button>
                    <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                </div>
            </div>
        }

        let serviceList = this.props.languageData;
        let tableData = null;
        { console.log(this.state.displayUpdateLanguage) }
        if (serviceList != "") {
            tableData = serviceList.map((service, index) =>
                <tr key={index}>
                    {this.state.displayUpdateLanguage && service.id == this.state.updateId
                        ? <React.Fragment>
                            <td className="five wide column">
                                <input placeholder="Update Language" value={this.state.language} onChange={this.onChangeTextField} />
                            </td>
                            <td className="five wide column">

                                <Dropdown
                                    placeholder='Language Level'
                                    fluid
                                    selection
                                    search
                                    value={this.state.level}
                                    options={languageLevels}
                                    onChange={(event, { name, value }) => this.handleChangeLevel(value)}
                                />
                            </td>
                            <td className="six wide column">
                                <button type="button" className="ui basic blue button" onClick={() => this.updateLanguage(service.id)}>Update</button>
                                <button type="button" className="ui basic red button" onClick={this.closeUpdate}>Cancel</button>
                            </td>
                        </React.Fragment>
                        : <React.Fragment>
                            <td className="five wide column">{service.name}</td>
                            <td className="five wide column">{service.level}</td>
                            <td className="six wide column">
                                <span className='tdFloatRight'>
                                    <Icon name="pencil" onClick={this.displayUpdateLanguage.bind(this, service.id, service.name, service.level)} />
                                    <Icon name="cancel" onClick={() => this.deleteLanguage(service.id)} />
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
                                <th>Language</th>
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