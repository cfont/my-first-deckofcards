import React, { useState } from "react";
import { injectIntl, IntlProvider } from "react-intl";
import PropTypes from 'prop-types';
import { Typography, Switch } from '@hedtech/react-design-system/core';
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

class PreventRemoveCard extends React.Component {
    render() {
        const { classes, cardControl: {setPreventRemove, setPreventRemoveMessage} } = this.props;

        return (
            <div className={classes.card}>
                <Typography className={classes.label} variant="body2" color="textPrimary">
                    Toggle ability to remove card:
                </Typography>
                <ToggleFooter
                    setPreventRemove={setPreventRemove}
                    setPreventRemoveMessage={setPreventRemoveMessage}
                />
            </div>
        )
    }
}

PreventRemoveCard.propTypes = {
    cardControl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const CardBody = injectIntl(PreventRemoveCard);

const PreventRemoveCardWrapper = props => {
    const { userInfo: {locale} } = props;

    return (
        <IntlProvider locale={locale} messages={getMessages(locale)}>
            <CardBody
                {...props}
            />
        </IntlProvider>
    )
}

PreventRemoveCardWrapper.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(PreventRemoveCardWrapper);

function ToggleFooter(props) {

    const [toggle, setToggle] = useState(false);

    function toggleSwitch() {
        setToggle(!toggle);
        const {setPreventRemove, setPreventRemoveMessage} = props;

        if (setPreventRemove != undefined) {
            setPreventRemove(!toggle);
            setPreventRemoveMessage(`You can't remove me!`);
        }
    }

    return (
        <Switch
            inputProps={{ 'aria-label': 'Toggle prevent remove' }}
            id={`switch-prevent-remove`}
            checked={toggle}
            onChange={toggleSwitch}
        />
    );
}

ToggleFooter.propTypes = {
    setPreventRemove: PropTypes.func.isRequired,
    setPreventRemoveMessage: PropTypes.func.isRequired
};