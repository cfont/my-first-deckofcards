import React, { useEffect, useState } from "react";
import { injectIntl, IntlProvider } from "react-intl";
import PropTypes from 'prop-types';
import { Button, Typography } from '@hedtech/react-design-system/core';
import { spacingSmall } from "@hedtech/react-design-system/core/styles/tokens";
import { withStyles } from '@hedtech/react-design-system/core/styles';
import { getMessages } from '../i18n/intlUtility'

const styles = () => ({
    count: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    reset: {
        marginTop: spacingSmall
    }
});

const cacheKey = 'local-cache-card:view-count';

const CacheCard = props => {
    const { classes, cache: { getItem, storeItem, removeItem } } = props;

    const [viewedCount, setViewedCount] = useState(0);

    const resetCount = () => {
        setViewedCount(0);
        removeItem({key: cacheKey});
    }

    useEffect(() => {
        const fetchCount = async () => {
            const {data} = await getItem({key: cacheKey});
            const count = data ? data.count + 1 : 1;
            storeItem({key: cacheKey, data: {count}});
            setViewedCount(count);
        };

        // load and increment view count
        fetchCount();

        if (props.setActions) {
            props.setActions([
                {
                    icon: 'Reset',
                    text: 'Reset',
                    onClick: resetCount
                }
            ]);
        }
    }, [])

    return (
        <div className={classes.count}>
            <Typography className={classes.label} variant="body2" color="textPrimary">
                View Count: {viewedCount}
            </Typography>
            <Button className={classes.reset} onClick={resetCount}>Reset</Button>
        </div>
    )
}

CacheCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cache: PropTypes.object.isRequired
};

const CardBody = injectIntl(CacheCard);

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