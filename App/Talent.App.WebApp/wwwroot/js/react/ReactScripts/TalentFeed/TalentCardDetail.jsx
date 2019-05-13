import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
import { Embed, Label } from 'semantic-ui-react'

export default class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayProfile: false
        };
        this.renderProfile = this.renderProfile.bind(this);
        this.profileDisplay = this.profileDisplay.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    renderProfile() {
        return (
            <div className="ui two column grid fluid">
                <div className="row">
                    <div className="eight wide column">
                        <img className="ui large image"
                            src={this.props.talentDetail.photoId
                                ? this.props.talentDetail.photoId
                                : "http://semantic-ui.com/images/avatar2/large/matthew.png"} />
                    </div>
                    <div className="column">
                        <div className="talentDetails">
                            <h4>Talent snapshot</h4>
                        </div>
                        <div className="talentDetails">
                            <h5 className="talentDetailsHeaders">CURRENT EMPLOYER</h5>
                            <div>
                                {this.props.talentDetail.workExperience.length > 0
                                    ? this.props.talentDetail.workExperience[0].company
                                    : "N/A"}
                            </div>
                        </div>
                        <div className="talentDetails">
                            <h5 className="talentDetailsHeaders">VISA STATUS</h5>
                            <div>
                                {this.props.talentDetail.visaStatus
                                    ? this.props.talentDetail.visaStatus
                                    : "N/A"}
                            </div>
                        </div>
                        <div className="talentDetails">
                            <h5 className="talentDetailsHeaders">POSITION</h5>
                            <div>
                                {this.props.talentDetail.workExperience.length > 0
                                    ? this.props.talentDetail.workExperience[0].position
                                    : "N/A"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

    profileDisplay() {
        const switchRender = !this.state.displayProfile;
        this.setState({ displayProfile: switchRender });
    }

    handleButtonClick(name) {
        if (name === 'linkedIn') {
            console.log("test " + this.props.talentDetail.linkedAccounts.linkedIn)
            window.open(this.props.talentDetail.linkedAccounts.linkedIn);
        } else {
            console.log("test " + this.props.talentDetail.linkedAccounts.github)
            window.open(this.props.talentDetail.linkedAccounts.github);
        }
    }

    render() {
        return (<React.Fragment>
            <div className="ui fluid card">
                <div className="content">
                    <div className="inline">
                        <h4>
                            {this.props.talentDetail.name
                                ? this.props.talentDetail.name
                                : 'Talent Name'}
                            <div className="inline right floated"><i className="star large icon"></i></div>
                        </h4>
                    </div>
                </div>
                <div className="content stylePadding">
                    {this.state.displayProfile
                        ? this.renderProfile()
                        : <Embed url='' />}
                </div>
                <div className="center aligned content styleCursor">
                    <div className="ui grid">
                        <div className="four wide column">
                            {this.state.displayProfile
                                ? <i className="video large icon" onClick={this.profileDisplay}></i>
                                : <i className="user large icon" onClick={this.profileDisplay}></i>}
                        </div>
                        <div className="four wide column">
                            <i className="file pdf outline large icon"></i>
                        </div>
                        <div className="four wide column">
                            <i className="linkedin large icon" onClick={() => this.handleButtonClick('linkedIn')}></i>
                        </div>
                        <div className="four wide column">
                            <i className="github large icon" onClick={() => this.handleButtonClick('github')}></i>
                        </div>
                    </div>
                </div>
                <div className="extra content">
                    <div>
                        {this.props.talentDetail.skills.length > 0
                            ? this.props.talentDetail.skills.map(skills =>
                                <Label basic color='blue'
                                    key={skills.id}>
                                    {skills.name}
                                </Label>)
                            : 'No current skills'}
                    </div>
                </div>
            </div>
        </React.Fragment>);
    }
}