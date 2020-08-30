import React, { Component } from 'react';
import MainBase from '../MainBasePage/mainbase';
import Tampildata from './tampildata';

export default class Tampildataindex extends Component{
    
    render() {
        return (
             <React.Fragment>
                 <MainBase content={<Tampildata/>}></MainBase>
             </React.Fragment>
        );
    }
}