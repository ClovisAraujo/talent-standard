import React from 'react';
import { Loader } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.companyDetails) {
            return null
        } else {
            return (
                <React.Fragment>
                    <div className="ui card">
                        <div className="content">
                            <div className="center aligned">
                                <img
                                    src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                                    className="ui circular image companyLogoSize"
                                />
                            </div>
                            <br />
                            <div className="center aligned header">{this.props.companyDetails.name}</div>
                            <div className="center aligned meta"><i className="marker icon" />{this.props.companyDetails.location.city}, {this.props.companyDetails.location.country}</div>
                            <div className="center aligned description ">
                                We currently do not have specific skills that we desire.
                </div>
                        </div>
                        <div className="extra content">
                            <a><i className="phone icon" />: {this.props.companyDetails.phone}</a>
                            <br />
                            <a><i className="mail icon" />: {this.props.companyDetails.email}</a>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}