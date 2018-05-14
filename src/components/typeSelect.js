import React, { Component } from 'react';
import {Select} from '@icedesign/base';
import axios from 'axios';

export default class TypeSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            typeID: ""
        }
    }
    componentDidMount () {
       this.fecthdata(); 
    }
    fecthdata () {
        axios.get('http://localhost:8080/monitorType')
            .then((response) => {
                console.log(response);
                let data = response.data;
                let dataArr = data.map((value) => 
                {return {label: value.typeName, value: ''+value.typeID}});
                this.setState({dataSource: dataArr});
            })
    }
    onChange (value) {
        console.log(" center select change value",value);
        this.setState({typeID: value});
        this.triggerChange(value);
    }
    componentWillReceiveProps (nextprops) {
        console.log("props is change",nextprops);
        if ('value' in nextprops) {
            const value = nextprops.value;
            this.setState({typeID: value || ""})
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
                  value={this.state.typeID || ""}
                  onChange={this.onChange.bind(this)} />
        )
    }
}