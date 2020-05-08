import React from "react";
import { injectIntl, IntlProvider } from "react-intl";
import PropTypes from 'prop-types';
import { spacingSmall } from "@hedtech/react-design-system/core/styles/tokens";
import { withStyles } from '@hedtech/react-design-system/core/styles';
import { getMessages } from '../i18n/intlUtility'

const styles = () => ({
    card: {
        marginLeft: spacingSmall,
        marginRight: spacingSmall
    }
});

const cacheKey = 'local-cache-card:view-count';

const PropsCard = props => {
    const {classes} = props;

    return (
        <pre className={classes.card}>
            {JSON.stringify(props, undefined, 2)}
        </pre>
    )
}

PropsCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const CardBody = injectIntl(PropsCard);

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