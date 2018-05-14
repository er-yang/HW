import React, { Component } from 'react';
import {Select} from '@icedesign/base';
import axios from 'axios';

export default class UserSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            accountID: ""
        }
    }
    componentDidMount () {
       this.fecthdata(); 
    }
    fecthdata () {
        axios.get('http://localhost:8080/user')
            .then((response) => {
                console.log(response);
                let data = response.data;
                let dataArr = data.map((value) => 
                {return {label: value.accountName, value: ''+value.accountID}});
                this.setState({dataSource: dataArr});
            })
    }
    onChange (value) {
        console.log(" center select change value",value);
        this.setState({accountID: value});
        this.triggerChange(value);
    }
    componentWillReceiveProps (nextprops) {
        console.log("props is change",nextprops);
        if ('value' in nextprops) {
            const value = nextprops.value;
            this.setState({accountID: value || ""})
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
                  value={this.state.accountID || ""}
                  onChange={this.onChange.bind(this)} />
        )
    }
}