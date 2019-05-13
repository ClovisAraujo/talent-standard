import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader, Icon, Pagination } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null,
            talentDetails: []
        }

        this.init = this.init.bind(this);
        this.loadEmployerData = this.loadEmployerData.bind(this);
        this.loadTalentData = this.loadTalentData.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });
    }

    componentDidMount() {
        this.loadEmployerData()
        this.loadTalentData()
        this.init()
    };

    loadEmployerData() {
        var link = 'http://clovisstmd2profile.azurewebsites.net/profile/profile/getEmployerProfile';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contenttype: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res)
                let companyDetails = null
                if (res.employer) {
                    companyDetails = res.employer.companyContact
                }
                this.setState({ companyDetails })
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }

    loadTalentData() {
        var link = 'http://clovisstmd2profile.azurewebsites.net/profile/profile/getTalentList';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                if (res.success) {
                    console.log("test success " + res)
                    this.setState({ talentDetails: res.data })
                }
                else {
                    console.log("test failed" + res)
                }
            }.bind(this),
            error: function (res) {
                console.log(res)
            }
        })
    }

    render() {

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <CompanyProfile companyDetails={this.state.companyDetails} />
                    </div>
                    <div className="eight wide column">
                        <TalentCard talentDetails={this.state.talentDetails} />
                    </div>
                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion />
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}