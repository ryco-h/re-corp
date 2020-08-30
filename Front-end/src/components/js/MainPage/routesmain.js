import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TambahDatas from './Tambahdata/index';
import TampilDatas from './Tampildata/index';

class MainPage extends Component {
    render() {
        return (
             <React.Fragment>
                 <Switch>
                     <Redirect from='/' to='/tambahdata' exact/>
                     <Route path='/tambahdata' component={TambahDatas}></Route>
                     <Route path='/tampildata' component={TampilDatas}></Route>
                 </Switch>
             </React.Fragment>
        );
    }
}

export default MainPage;