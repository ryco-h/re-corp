import React, { Component } from 'react';
import MainBase from '../MainBasePage/mainbase';
import TambahData from './tambahdata';

export default class TambahDataindex extends Component{
    
    render() {
        return (
             <React.Fragment>
                 <MainBase content={<TambahData/>}></MainBase>
             </React.Fragment>
        );
    }
}