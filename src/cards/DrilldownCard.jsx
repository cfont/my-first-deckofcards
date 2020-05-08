import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Typography, Button } from '@hedtech/react-design-system/core';
import { spacingSmall } from "@hedtech/react-design-system/core/styles/tokens";
import { withStyles } from '@hedtech/react-design-system/core/styles';

const styles = {
    button: {
        margin: spacingSmall
    },
    text: {
        margin: spacingSmall
    }
};

const DrilldownCard = (props) => {
    const { classes, cardControl: {
            drilldown, resetDrilldown
        } = {} } = props;

    const [ count, setCount ] = useState(0);
    const [ inDetail, setInDetail] = useState(false);

    useEffect(() => {
        if(count > 0) {
            setInDetail(true);
        }
    }, [count]);

    useEffect(() => {
        if(inDetail) {
            drilldown( () => {
                setInDetail(false);
            }, `Clicks: ${count}`);
        }
    }, [inDetail]);

    return (
        inDetail
          ? <div>
                <Typography className={classes.text}>You clicked {count} times</Typography>
                <Button className={classes.button} onClick={() => {
                    resetDrilldown();
                    setInDetail(false);
                }}>Go back</Button>
            </div>
          : <Button className={classes.button} onClick={() => {
                setCount(count + 1);
            }}>Click me</Button>
    );
};

DrilldownCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object.isRequired
};


export default withStyles(styles)(DrilldownCard);
