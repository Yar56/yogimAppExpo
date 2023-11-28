import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export const ReduxProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};
