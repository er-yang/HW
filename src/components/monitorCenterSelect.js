import React, { Component } from 'react';
import {Select} from '@icedesign/base';
import axios from 'axios';

export default class CenterSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            centerID: ""
        }
    }
    componentDidMount () {
       this.fecthdata(); 
    }
    fecthdata () {
        axios.get('http://localhost:8080/monitorCenter')
            .then((response) => {
                console.log(response);
                let data = response.data;
                let dataArr = data.map((value) => 
                {return {label: value.centerName, value: ''+value.centerID}});
                this.setState({dataSource: dataArr});
            })
    }
    onChange (value) {
        console.log(" center select change value",value);
        this.setState({centerID: value});
        this.triggerChange(value);
    }
    componentWillReceiveProps (nextprops) {
        console.log("props is change",nextprops);
        if ('value' in nextprops) {
            const value = nextprops.value;
            this.setState({centerID: value || ""})
        }
    }
    triggerChange (value) {
        let onChange = this.props.onChange;
        if (onChange) {
            onChange(value);
        }
    }
    render() {
        console.log("---------------", this.state);
        return (  
          <Select size="large"
                  placeholder="请选择..."
                  dataSource={this.state.dataSource} 
                  value={this.state.centerID || ""}
                  onChange={this.onChange.bind(this)} />
        )
    }
}