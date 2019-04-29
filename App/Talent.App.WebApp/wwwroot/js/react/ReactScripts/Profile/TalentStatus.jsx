import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);


        const data = props.status ? props.status :
            {
                status: '',
                availableDate: null
            }

        this.state = {
            status: data.status,
            availableDate: data.availableDate
        }


        this.handleChange = this.handleChange.bind(this)
        this.saveJobStatus = this.saveJobStatus.bind(this)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.status !== prevState.status) 
        {
            this.saveJobStatus();
        }
    }


    handleChange(name) {
        this.setState({
            status: name
        })
    }

    saveJobStatus() {
        const data = { status: this.state.status, availableDate: null }
        this.props.saveProfileData({ jobSeekingStatus: data })
    }


    render() {


        return (
            <React.Fragment>
                <div className='row'>
                    <div className="ui sixteen wide column">
                        <div className='fields'>
                            <div className="sixteen wide field">
                                <label>Current Status</label>
                            </div>
                        </div>
                        <div className='fields'>
                            <div className="sixteen wide field">
                                <Checkbox
                                    radio
                                    label='Actively looking for a job'
                                    name='looking'
                                    value='looking'
                                    checked={this.props.status.status === 'looking'}
                                    onChange={() => this.handleChange('looking')}
                                />
                            </div>
                        </div>
                        <div className='fields'>
                            <div className="sixteen wide field">
                                <Checkbox
                                    radio
                                    label='Not looking for a job at the moment'
                                    name='not looking'
                                    value='not looking'
                                    checked={this.props.status.status === 'not looking'}
                                    onChange={() => this.handleChange('not looking')}
                                />
                            </div>
                        </div>
                        <div className='fields'>
                            <div className="sixteen wide field">
                                <Checkbox
                                    radio
                                    label='Currently employed but open to offers'
                                    name='open'
                                    value='open'
                                    checked={this.props.status.status === 'open'}
                                    onChange={() => this.handleChange('open')}
                                />
                            </div>
                        </div>
                        <div className='fields'>
                            <div className="sixteen wide field">
                                <Checkbox
                                    radio
                                    label='Will be available on later date'
                                    name='later'
                                    value='later'
                                    checked={this.props.status.status === 'later'}
                                    onChange={() => this.handleChange('later')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}