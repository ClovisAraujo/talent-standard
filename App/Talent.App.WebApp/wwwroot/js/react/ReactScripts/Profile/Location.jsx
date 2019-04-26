import React from 'react'
import Cookies from 'js-cookie'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import countries from '../../../../util/jsonFiles/countries.json';
import { Dropdown } from 'semantic-ui-react';


export class Address extends React.Component {
    constructor(props) {
        super(props)

        const address = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                country: "",
                city: "",
                postCode: "",
            }

        this.state = {
            showEditSection: false,
            newAddress: address
        }

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCountryCity = this.handleChangeCountryCity.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
    }

    openEdit() {
        const address = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: address
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChangeCountryCity(name, value) {
        const data = Object.assign({}, this.state.newAddress)
        data[name] = value
        console.log(name)
        this.setState({
            newAddress: data
        })
        console.log(this.state.newAddress)
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        console.log(event.target.name)
        this.setState({
            newAddress: data
        })
        console.log(this.state.newAddress)
    }

    saveAddress() {
        const data = {}
        data.address = Object.assign({}, this.state.newAddress)
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderDisplay() {
        const { number, street, suburb, city, country, postCode } = this.props.addressData
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <p>Address: {number || street || suburb || postCode ? `${number}, ${street}, ${suburb}, ${postCode}` : ""}</p>
                    <p>City: {city ? `${city}` : ""}</p>
                    <p>Country: {country ? `${country}` : ""}</p>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

    renderEdit() {
        let countriesList = [];
        let citiesList = [];
        const selectedCountry = this.state.newAddress.country;
        const selectedCity = this.state.newAddress.city;

        countriesList = Object.keys(countries).sort((a, b) => a.name > b.name).map((list, index) => { return { key: index, text: list, value: list } })


        if (selectedCountry != "" && selectedCountry != null) {
            let populateList = countries[selectedCountry]

            citiesList = populateList.sort((a, b) => a.name > b.name).map((list, index) => { return { key: index, text: list, value: list } })
        }


        return (
            <div className='ui sixteen wide column'>
                <div className='fields'>
                    <div className='four wide field'>
                        <ChildSingleInput
                            inputType="text"
                            label="Number"
                            name="number"
                            value={this.state.newAddress.number}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your address number"
                            errorMessage="Please enter a valid address number"
                        /></div>
                    <div className='eight wide field'>
                        <ChildSingleInput
                            inputType="text"
                            label="Street"
                            name="street"
                            value={this.state.newAddress.street}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your address street"
                            errorMessage="Please enter a valid address street"
                        /></div>
                    <div className='four wide field'>
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            value={this.state.newAddress.suburb}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your address suburb"
                            errorMessage="Please enter a valid address suburb"
                        /></div>
                </div>
                <div className='fields'>
                    <div className='six wide field'>
                        <label>Country</label>
                        <Dropdown
                            placeholder='Select Country'
                            fluid
                            selection
                            search
                            value={selectedCountry}
                            options={countriesList}
                            onChange={(event, { name, value }) => this.handleChangeCountryCity('country', value)}
                        />
                    </div>
                    <div className='six wide field'>
                        <label>City</label>
                        <Dropdown
                            placeholder='Select City'
                            fluid
                            selection
                            search
                            value={selectedCity}
                            options={citiesList}
                            onChange={(event, { name, value }) => this.handleChangeCountryCity('city', value)}
                        />
                    </div>
                    <div className='four wide field'>
                        <ChildSingleInput
                            inputType="number"
                            label="Post Code"
                            name="postCode"
                            value={this.state.newAddress.postCode}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your address post code"
                            errorMessage="Please enter a valid address post code"
                        /></div>
                </div>
                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

}


export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(value) {
        if (value === "" || value == null) {
            TalentUtil.notification.show("Please select a nationality", "error")
        } else {
            this.props.saveProfileData({ nationality: value })
        }
    }



    render() {

        let countriesList = [];
        countriesList = Object.keys(countries).sort((a, b) => a.name > b.name).map((list, index) => { return { key: index, text: list, value: list } })

        return (
            <div className="six wide column">
                <Dropdown
                    placeholder='Select your nationality'
                    fluid
                    selection
                    search
                    value={this.props.nationalityData}
                    options={countriesList}
                    onChange={(event, { name, value }) => this.handleChange(value)}
                />
            </div>
        )

    }
}