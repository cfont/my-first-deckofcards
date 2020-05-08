import React, {Fragment} from "react";
import { injectIntl, IntlProvider } from "react-intl";
import PropTypes from 'prop-types';
import {
    Typography
} from '@hedtech/react-design-system/core';
import {
    spacingSmall
} from "@hedtech/react-design-system/core/styles/tokens";
import { withStyles } from '@hedtech/react-design-system/core/styles';
import { getMessages } from '../i18n/intlUtility'

const styles = () => ({
    card: {
        margin: spacingSmall
    }
});

const CardConfigurationCard = props => {
    const { classes, cardInfo: {configuration} } = props;

    const configurationItems = [];

    if (configuration) {
        Object.keys(configuration).forEach( key => {
            configurationItems.push( {
                key,
                value: configuration[key]
            })
        })
    }

    return (
        <div className={classes.card}>
            {configurationItems.map( item => (
                <Fragment key={item.key}>
                    <Typography variant="body2" color="textPrimary">
                        {item.key}:
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                        {item.value}
                    </Typography>
                </Fragment>
            ))}
        </div>
    )
}

CardConfigurationCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired
};

const CardBody = injectIntl(CardConfigurationCard);

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