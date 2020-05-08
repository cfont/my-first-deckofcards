import React, { useState } from "react";
import { injectIntl, IntlProvider } from "react-intl";
import PropTypes from 'prop-types';
import { Typography, Button } from '@hedtech/react-design-system/core';
import {
    spacingSmall
} from "@hedtech/react-design-system/core/styles/tokens";
import { withStyles } from '@hedtech/react-design-system/core/styles';
import { getMessages } from '../i18n/intlUtility'

const styles = () => ({
    card: {
        padding: spacingSmall
    }
});

class LoadingStateCard extends React.Component {
    render() {
        const { classes, cardControl: {setLoadingStatus} } = this.props;

        return (
            <div className={classes.card}>
                <Typography className={classes.label} variant="body2" color="textPrimary">
                    Set the loading status for 10 seconds
                </Typography>
                <LoadingButton
                    setLoadingStatus={setLoadingStatus}
                />
            </div>
        )
    }
}

LoadingStateCard.propTypes = {
    cardControl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const CardBody = injectIntl(LoadingStateCard);

const LoadingStateCardWrapper = props => {
    const { userInfo: {locale} } = props;

    return (
        <IntlProvider locale={locale} messages={getMessages(locale)}>
            <CardBody
                {...props}
            />
        </IntlProvider>
    )
}

LoadingStateCardWrapper.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(LoadingStateCardWrapper);

function LoadingButton(props) {

    const [status, setStatus] = useState('loaded');

    function reload() {
        setStatus('loading');
        const {setLoadingStatus} = props;

        if (setLoadingStatus != undefined) {
            setLoadingStatus(true);
        }
        setTimeout(reset, 10000);
    }

    function reset() {
        setStatus('loaded');
        const {setLoadingStatus} = props;

        if (setLoadingStatus != undefined) {
            setLoadingStatus(false);
        }
    }

    return (
        <div>
            <Typography variant="body2" color="textPrimary">
                Status: {status}
            </Typography>
            <Button
                aria-label={'Set loading status'}
                onClick={reload}
                color="secondary"
            >
                Reload
            </Button>
        </div>
    );
}

LoadingButton.propTypes = {
    setLoadingStatus: PropTypes.func.isRequired
};