import React, {Fragment, useEffect, useState} from "react";
import { injectIntl, IntlProvider } from "react-intl";
import PropTypes from 'prop-types';
import { withStyles } from '@hedtech/react-design-system/core/styles';
import jsonpath from 'jsonpath';
import { getMessages } from '../../i18n/intlUtility';
import {
    Typography, Table, TableHead, TableRow, TableCell, TableBody
} from '@hedtech/react-design-system/core';
import { spacingSmall, widthFluid } from '@hedtech/react-design-system/core/styles/tokens';
import moment from 'moment';


const styles = () => ({
    card: {
        marginLeft: spacingSmall
    }
});

const StudentChargesCard = props => {
    const { classes, cardInfo: { configuration }, cardControl: {setLoadingStatus}, data: {getEthosQuery}, mock = false } = props;

    const [studentCharges, setStudentCharges] = useState();

    const getAcademicPeriods = (configuration) => {
        if (configuration && configuration.myChargesAcademicPeriod) {
            const academicPeriodsString = configuration.myChargesAcademicPeriod;
            const academicPeriods = academicPeriodsString.split(',');
            const trimmed = academicPeriods.map(x => x.trim());
            return trimmed;
        } else {
            return [];
        }
    };

    useEffect(() => {
        (async () => {
            setLoadingStatus(true);

            // load the student-charges
            let studentCharges = [];

            if (mock) {
                // load mock data
                const studentChargesData = require('./studentCharges-mock.json');
                console.log('ethosQuery results', studentChargesData);
                studentCharges = jsonpath.query(studentChargesData, '$..data.studentCharges11.edges..node');
                console.log('jsonpath query results', studentCharges);
                console.log('academicPeriodCode: ', configuration.myChargesAcademicPeriod);
            } else {
                try {
                    console.log('academicPeriodCode: ', configuration.myChargesAcademicPeriod);
                    console.log('config getter: ', getAcademicPeriods(configuration));
                    const studentChargesData = await getEthosQuery({ queryId: 'list-student-charges', properties: { 'academicPeriodCodes': getAcademicPeriods(configuration) } })
                    console.log('ethosQuery results', studentChargesData);
                    studentCharges = jsonpath.query(studentChargesData, '$..data.studentCharges16.edges..node');
                    console.log('jsonpath query results', studentCharges);
                } catch (error) {
                    console.log('ethosQuery failed', error);
                }
            }

            setLoadingStatus(false);
            setStudentCharges(() => (studentCharges));
        })()
    }, [getEthosQuery, mock])

    return (
        <div className={classes.card}>
            <Typography gutterBottom>The following charges have been found on your account:</Typography>
            <br />
            <div id='My_Table' className={classes.root}>
                <Table className={classes.table} layout={{ variant: 'card', breakpoint: 'sm' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Amount ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentCharges && studentCharges.map(studentCharge => (
                            <TableRow key={studentCharge.id} hover='true'>
                                <TableCell columnName="Date">
                                    {moment(studentCharge.chargeableOn).calendar()}
                                </TableCell>
                                <TableCell columnName="Type">
                                    {studentCharge.chargeType}
                                </TableCell>
                                <TableCell columnName="Amount ($)" align="right">
                                    {studentCharge.chargedAmount.amount.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

StudentChargesCard.propTypes = {
    cardControl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired
};

const CardBody = injectIntl(StudentChargesCard);

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