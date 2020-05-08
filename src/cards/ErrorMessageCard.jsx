import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Typography, TextField, Button } from '@hedtech/react-design-system/core';
import {
    spacingSmall
} from "@hedtech/react-design-system/core/styles/tokens";
import { withStyles } from '@hedtech/react-design-system/core/styles';

import { injectIntl, IntlProvider, intlShape, addLocaleData } from "react-intl";
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import { getMessages } from '../i18n/intlUtility'

addLocaleData([...en, ...es]);

const styles = () => ({
    card: {
        padding: spacingSmall
    }
});

class ErrorMessageCard extends React.Component {
    render() {
        const { classes, cardControl: {setErrorMessage}, intl } = this.props;

        return (
            <div className={classes.card}>
                <Typography className={classes.label} variant="body2" color="textPrimary">
                    Set an error message to display
                </Typography>
                <ErrorMessage
                    setErrorMessage={setErrorMessage}
                    intl={intl}
                />
            </div>
        )
    }
}

ErrorMessageCard.propTypes = {
    cardControl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};

const CardBody = injectIntl(ErrorMessageCard);

const ErrorMessageCardWrapper = props => {
    const { userInfo: {locale} } = props;

    return (
        <IntlProvider locale={locale} messages={getMessages(locale)}>
            <CardBody
                {...props}
            />
        </IntlProvider>
    )
}

ErrorMessageCardWrapper.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(ErrorMessageCardWrapper);

function ErrorMessage(props) {

    const [headerMessage, setHeaderMessage] = useState('Access denied');
    const [textMessage, setTextMessage] = useState('You are not permitted to see this data');
    const [iconName, setIconName] = useState('privacy');
    const [iconColor, setIconColor] = useState('red');

    const {intl} = props;

    const handleChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case 'headerMessage':
                setHeaderMessage(value);
                break;
            case 'textMessage':
                setTextMessage(value);
                break;
            case 'iconName':
                setIconName(value);
                break;
            case 'iconColor':
                setIconColor(value);
                break;
            default:
                break;
        }
    };

    function submitValues() {
        const {setErrorMessage} = props;

        if (setErrorMessage != undefined) {
            setErrorMessage({headerMessage, textMessage, iconName, iconColor});
        }
    }

    return (
        <div>
            <TextField
                name='headerMessage'
                inputProps={{'aria-label': intl.formatMessage({id: 'headerMessage'})}}
                id={'headerMessage'}
                label={intl.formatMessage({id: 'headerMessage'})}
                onChange={handleChange}
                fullWidth={true}
                value={headerMessage}
            />
            <TextField
                name='textMessage'
                inputProps={{'aria-label': intl.formatMessage({id: 'textMessage'})}}
                id={'textMessage'}
                label={intl.formatMessage({id: 'textMessage'})}
                onChange={handleChange}
                fullWidth={true}
                value={textMessage}
            />
            <TextField
                name='iconName'
                inputProps={{'aria-label': intl.formatMessage({id: 'iconName'})}}
                id={'iconName'}
                label={intl.formatMessage({id: 'iconName'})}
                onChange={handleChange}
                fullWidth={true}
                value={iconName}
            />
            <TextField
                name='iconColor'
                inputProps={{'aria-label': intl.formatMessage({id: 'iconColor'})}}
                id={'iconColor'}
                label={intl.formatMessage({id: 'iconColor'})}
                onChange={handleChange}
                fullWidth={true}
                value={iconColor}
            />
            <Button
                aria-label={'Set error message'}
                onClick={submitValues}
                color="secondary"
            >
                Submit
            </Button>
        </div>
    );
}

ErrorMessage.propTypes = {
    setErrorMessage: PropTypes.func.isRequired,
    intl: intlShape.isRequired
};