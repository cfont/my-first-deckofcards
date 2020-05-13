/* eslint-disable react/jsx-key,react/no-children-prop */
import React from "react";

import BuildingsCard from './BuildingsCard';
import CacheCard from './CacheCard';
import CardConfigurationCard from './CardConfigurationCard';
import DrilldownCard from './DrilldownCard';
import ErrorMessageCard from './ErrorMessageCard';
import LoadingStateCard from './LoadingStateCard';
import PreventRemoveCard from './PreventRemoveCard';
import PropsCard from './PropsCard';
import ThrowErrorCard from './ThrowErrorCard';
import StudentChargesCard from './StudentChargesCard';

export default [
    <BuildingsCard type="BuildingsCard"/>,
    <CacheCard type="CacheCard" />,
    <CardConfigurationCard type="CardConfigurationCard" />,
    <DrilldownCard type="DrilldownCard" />,
    <ErrorMessageCard type="ErrorMessageCard" />,
    <LoadingStateCard type="LoadingStateCard" />,
    <PreventRemoveCard type="PreventRemoveCard" />,
    <PropsCard type="PropsCard" />,
    <ThrowErrorCard type="ThrowErrorCard" />,
    <CacheCard type="CacheCard" />,
    <StudentChargesCard type="StudentChargesCard" />
];