import React, { Component } from 'react';
import {Select} from '@icedesign/base';
import axios from 'axios';

export default class DepartmentSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            departmentID: ""
        }
    }
    componentDidMount () {
       this.fecthdata(); 
    }
    fecthdata () {
        axios.get('http://localhost:8080/department')
            .then((response) => {
                console.log(response);
                let data = response.data;
                let dataArr = data.map((value) => 
                {return {label: value.departmentName, value: ''+value.departmentID}});
                console.log();
                this.setState({dataSource: dataArr});
            })
    }
    onChange (value) {
        console.log(" department select change value",value);
        this.setState({departmentID: value});
        this.triggerChange(value);
    }
    componentWillReceiveProps (nextprops) {
        console.log("props is change",nextprops);
        if ('value' in nextprops) {
            const value = nextprops.value;
            this.setState({departmentID: value || ""})
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
                  value={this.state.departmentID || ""}
                  onChange={this.onChange.bind(this)} />
        )
    }
}