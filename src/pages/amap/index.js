import React, { Component } from 'react';
import {Map} from 'react-amap';

export default class Amap extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <div className="map-container" style={{width: '100%', height: '400px'}}>
            <Map amapkey={'ac561bbb6ed1c23ea025f1f645bc3b3e'}/>
            </div>
        )
    }
}