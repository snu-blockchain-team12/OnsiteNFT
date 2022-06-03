import React from 'react';

import {
    EuiPage,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageHeader,
    EuiPageSideBar,
    EuiPageBody,
    EuiTitle,
} from '@elastic/eui';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Header from './components/Header';

import Index from './example/react/index';
import Login from './example/react/login';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider) {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}

function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Router>
                <div className="app">
                    <Header />
                    
                    <EuiPage paddingSize="none" style={{ height: '100%'}}>
                        {/* <EuiPageSideBar>
                            <SideNav />
                        </EuiPageSideBar> */}
                        <EuiPageBody panelled paddingSize="none">
                            <EuiPageBody paddingSize="m">
                                <EuiPageContent
                                    hasBorder={false}
                                    hasShadow={false}
                                    paddingSize="none"
                                    color="transparent"
                                    borderRadius="none"
                                >
                                    <EuiPageContentBody>
                                        <Switch>
                                            <Route path="/login">
                                                <Login />
                                            </Route>
                                            <Route exact path="/">
                                                <Index />
                                            </Route>
                                        </Switch>
                                    </EuiPageContentBody>
                                </EuiPageContent>
                            </EuiPageBody>
                        </EuiPageBody>
                    </EuiPage>
                </div>
            </Router>
        </Web3ReactProvider>
    );
}

export default App;
