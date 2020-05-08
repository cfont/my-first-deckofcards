/* eslint-disable react/no-children-prop */
import React from "react";
import ReactDOM from "react-dom";
import { EDSApplication } from '@hedtech/react-design-system/core';
import { IconSprite } from '@eui/ds-icons/lib';
import Cards from '../cards';
import { AppProvider, SpaceDetailProvider, MockSpaceDetail } from 'experience-extension';
import {IntlProvider} from 'react-intl';

const extensionJSON = require('./build/extension.json');
const user = require('./user.json');
const messages = {
    'app.removeBookmarkCardText': 'Remove card',
    'back': 'Back',
    'discover.moreButton': 'Discover more',
    'error.details': 'Details'
};

const App = () => (
    <EDSApplication>
        <IconSprite />
        <IntlProvider locale="en" messages={messages}>
            <AppProvider value={{
                showDashboardType: 'bookmarks',
                triggerOnboardingWizard: null,
                triggerLogOut: null
            }}>
                <SpaceDetailProvider value={{
                    cardsCanExpand: false,
                    cardExpanded: null,
                    setCardExpanded: null,
                    setDeleteOnClose: null,
                    deleteOnClose: false
                    }}>
                        <MockSpaceDetail
                            children={Cards}
                            extension={extensionJSON}
                            user={user}
                        ></MockSpaceDetail>
                </SpaceDetailProvider>
            </AppProvider>
        </IntlProvider>
    </EDSApplication>
)

ReactDOM.render(<App />, document.getElementById('root'));