import React, {Fragment, useEffect, useState} from "react";
import { injectIntl, IntlProvider } from "react-intl";
import PropTypes from 'prop-types';
import {
    Typography
} from '@hedtech/react-design-system/core';
import {
    spacingSmall
} from "@hedtech/react-design-system/core/styles/tokens";
import { withStyles } from '@hedtech/react-design-system/core/styles';
import jsonpath from 'jsonpath';
import { getMessages } from '../../i18n/intlUtility'

const styles = () => ({
    card: {
        marginLeft: spacingSmall
    }
});

const BuildingsCard = props => {
    const { classes, cardControl: {setLoadingStatus}, data: {getEthosQuery}, mock = false } = props;

    const [buildings, setBuildings] = useState();

    useEffect(() => {
        (async () => {
            setLoadingStatus(true);

            // load the buildings
            let buildings = [];

            if (mock) {
                // load mock data
                const buildingsData = require('./buildings-mock.json');
                buildings = jsonpath.query(buildingsData, '$..data.buildings.edges..node');
            } else {
                try {
                    const buildingsData = await getEthosQuery({queryId: 'list-buildings'})
                    buildings = jsonpath.query(buildingsData, '$..data.buildings.edges..node');
                } catch (error) {
                    console.log('ethosQuery failed', error);
                }
            }

            setLoadingStatus(false);
            setBuildings(() => (buildings));
        })()
    }, [getEthosQuery, mock])

    return (
        <div className={classes.card}>
            {buildings && buildings.map( building => (
                <Fragment key={building.id}>
                    <Typography variant="body2" color="textPrimary">
                        {building.title}
                    </Typography>
                </Fragment>
            ))}
        </div>
    )
}

BuildingsCard.propTypes = {
    cardControl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const CardBody = injectIntl(BuildingsCard);

const CardWrapper = props => {
    const { userInfo: {locale} } = props;

    return (
        <IntlProvider locale={locale} messages={getMessages(locale)}>
            <CardBody
                {...props}
            />
        </IntlProvider>
    )
}

CardWrapper.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(CardWrapper);