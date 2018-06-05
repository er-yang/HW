import React, { Component } from 'react';
import {Table, Pagination,Button,Icon, Search, Select,} from '@icedesign/base';
import {BarChart,  Line, XAxis, YAxis, CartesianGrid,AreaChart, Area, Tooltip , Legend, Bar, Radar, RadarChart, PolarGrid,
         PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import IceContainer from '@icedesign/container';
import axios from 'axios';
import './index.css';

const Column = Table.Column;

export default class Analysis extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: [],
            typeData: [],
            timeData: [],
            nodeList: [],
            nodeID: ""
            }

    }

    componentDidMount () {
       this.fecthdata(); 
       this.SelectData();
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
    getAnalysisData (nodeID){
         axios.get('http://localhost:8080/accident/count/'+nodeID)
            .then((response) => {
                var data = response.data;
                let keyArray = this.getKeyArray();
                data.forEach((value, index)=>{
                    keyArray[parseInt(value.name)-1].times=value.times;
                });
                this.setState({timeData: keyArray});
            })
    }
    getKeyArray() {
            const array = Array(24);
            const keyArray = Array.apply(null, array).map((value,index) => {
                let label = index+1;
                return {"name": label,"times": 0};});
            return keyArray;
    }
    SelectData () {
        axios.get('http://localhost:8080/monitorNode/getBycenter')
            .then((response) => {
                console.log(response);
                var data = response.data;
                
                let dataArr = data.map((value) => 
                {return {label: value.nodeName, value: ''+value.nodeID}});
                this.setState({nodeList: dataArr});
            })
    }
    SelectOnChange (value) {
        this.setState({nodeID: value});
        this.getAnalysisData(value);
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
                    dataSource={this.state.nodeList}
                    value={this.state.nodeID}
                    onChange={this.SelectOnChange.bind(this)}
                  />
                </IceContainer>

            <IceContainer>
                <div className="container">
                <BarChart width={460} height={250} data={this.state.dataSource}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nodeName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar type="monotone" dataKey="times" fill="#82ca9d" />
                    </BarChart>
                </div>
                <div className="container">
               <RadarChart cx={225} cy={170} outerRadius={130} width={450} height={350} data={this.state.typeData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis/>
                    <Radar name="type" dataKey="times" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    </RadarChart>
                </div>
                <div className="container">
                {
                 !!this.state.nodeID&& (<AreaChart width={600} height={200} data={this.state.timeData}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area connectNulls={true} type='monotone' dataKey='times' stroke='#8884d8' fill='#8884d8' />
                    </AreaChart>)}
                    </div>
           </IceContainer>
      
            </div>
        )
    }
}