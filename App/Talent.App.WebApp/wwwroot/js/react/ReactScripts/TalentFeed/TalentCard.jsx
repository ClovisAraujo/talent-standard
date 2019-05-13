import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react';
import TalentCardDetail from './TalentCardDetail.jsx';

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleCards = this.handleCards.bind(this);
    };

    handleCards() {
        let talentDetails = this.props.talentDetails;
        let talentCards = [];
        if (talentDetails != '') {
            talentCards = talentDetails.map((details, index) => <TalentCardDetail talentDetail={details} key={index} />)
        }
        return talentCards;
    }

    render() {
        let talentCards = this.handleCards();
        return (
            <React.Fragment>
                {talentCards}
            </React.Fragment>
        )

    }
}

