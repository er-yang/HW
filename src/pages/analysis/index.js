import React, { Component } from 'react';
import {Table, Pagination,Button,Icon, Search, Select} from '@icedesign/base';
import {BarChart,  Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Radar, RadarChart, PolarGrid,
         PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import IceContainer from '@icedesign/container';
import axios from 'axios';

const Column = Table.Column;

export default class Analysis extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: [],
            typeData: []
            }

    }

    componentDidMount () {
       this.fecthdata(); 
    }
    fecthdata () {
        axios.get('http://localhost:8080/accident/count')
            .then((response) => {
                console.log(response);
                var accidentData = response.data.accident;
                var typeData = response.data.typedata;
                this.setState({dataSource: accidentData,typeData: typeData});
            })
    }
    render() {
        console.log("---------------", this.state);
        return (  
            <div>
                 <IceContainer>
                    <h2>分析</h2>
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
                <BarChart width={730} height={250} data={this.state.dataSource}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nodeName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar type="monotone" dataKey="times" fill="#82ca9d" />
                    </BarChart>
               <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={this.state.typeData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis/>
                    <Radar name="type" dataKey="times" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    </RadarChart> 
           </IceContainer>
      
            </div>
        )
    }
}