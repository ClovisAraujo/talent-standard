/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class
    extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                LinkedIn: "",
                github: "",
            }

        this.state = {
            showEditSection: false,
            updatedLinkedAccounts: linkedAccounts
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveLinkedAccounts = this.saveLinkedAccounts.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
    }

    componentDidMount() {
    }

    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            updatedLinkedAccounts: linkedAccounts
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.updatedLinkedAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            updatedLinkedAccounts: data
        })
    }

    saveLinkedAccounts() {
        console.log(this.state.updatedLinkedAccounts);
        const profile = {}
        profile.linkedAccounts = Object.assign({}, this.state.updatedLinkedAccounts)
        this.props.saveProfileData(profile)
        this.closeEdit()
    }


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderDisplay() {
        return (
            <div className='row'>
            <div className='ui sixteen wide column'>
                <span className='buttonsSpan'>
                    <button className="ui primary button buttonSize"><i className='linkedin icon' />{'  LinkedIn'}</button>
                </span>
                <span className='buttonsSpan'>
                    <button className="ui secondary button buttonSize"><i className='github icon' />{'  GitHub'}</button>
                </span>
                <button type="button" className='ui right floated teal button' onClick={this.openEdit}>Edit</button>
                </div>
                </div>
        )
    }


    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.updatedLinkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your linkedIn Url"
                    errorMessage="Please enter a valid Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.updatedLinkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Github Url"
                    errorMessage="Please enter a valid Url"
                />
                <button type="button" className="ui teal button" onClick={this.saveLinkedAccounts}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

}