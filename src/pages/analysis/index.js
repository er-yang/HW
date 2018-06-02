import React, { Component } from 'react';
import {Table, Pagination,Button,Icon, Search} from '@icedesign/base';
import {PieChart, Pie} from 'recharts';
import IceContainer from '@icedesign/container';
import axios from 'axios';

const Column = Table.Column;

export default class Analysis extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: [],
            rowSelection: {
                onChange: this.rowOnChange.bind(this),
                selectedRowKeys: [],
                total: 0, 
                page: 0,
                size: 10
            }

        }
    }

    componentDidMount () {
       this.fecthdata(); 
    }
    fecthdata () {
        axios.get('http://localhost:8080/camera')
            .then((response) => {
                console.log(response);
                var data = response.data;
                this.setState({dataSource: data.data, total: data.total});
            })
    }
    render() {
        console.log("---------------", this.state);
        return (  
            <div>
                 <IceContainer>
                    <h2>分析</h2>
                    <Search size="large" hasIcon inputWidth={280}/>
                    <Select
                    size="large"
                    placeholder="请选择..."
                    dataSource={[
                      { label: '有效', value: '1' },
                      { label: '禁用', value: '0' },
                    ]}
                  />
                </IceContainer>

            <IceContainer>
                <LineChart width={730} height={250} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
           </IceContainer>
      
            </div>
        )
    }
}