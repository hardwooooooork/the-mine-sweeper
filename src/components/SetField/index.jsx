import React, { Component } from 'react'
import SetFieldLayout from './SetFieldLayout'
import FindResultLayout from './FindResultLayout';


export default class SetField extends Component {
    render() {
        const { resultFlag } = this.props;

        //console.log(resultFlag);
        
        const Layout = (resultFlag)? FindResultLayout : SetFieldLayout;

        return (
            <Layout
                {...this.props}
            />
        )
    }
}
