import React, { Component } from 'react';
import {PieChart, Pie} from 'recharts';
import IceContainer from '@icedesign/container';
import CustomBarCharts from '../../components/customBarCharts';
import './index.css';
import IcePanel from '@icedesign/panel';
import axios from 'axios';

    const data02 = [{name: 'A1', value: 100},
                    {name: 'A2', value: 300},
                   {name: 'B1', value: 100},
                   {name: 'B2', value: 80},
                   {name: 'B3', value: 40},
                   {name: 'B4', value: 30},
                   {name: 'B5', value: 50},
                  {name: 'C1', value: 100},
                  {name: 'C2', value: 200},
                   {name: 'D1', value: 150},
                   {name: 'D2', value: 50}];
export default class Home extends Component {
  static displayName = 'Home';
  

  constructor(props) {
    super(props);
    this.state = {
      charData:[],
      deal:[]
    };
  }
  componentDidMount() {
    this.fecthdata();
  }
fecthdata () {
        axios.get('http://localhost:8080/accident/deal')
            .then((response) => {
                console.log(response);
                var data = response.data;
                this.setState({deal: data});
            })
    }
  render() {
    console.log("------", data02);
    return (<div className="home-page" >
              <IceContainer>
                <IcePanel status="info">
                  <IcePanel.Header>
                    待处理
                  </IcePanel.Header>
                  <IcePanel.Body>
                    {this.state.deal.map((value) => {
                      return (<div><p>{value.nodeName}</p><p>{value.description}</p><strong>待处理</strong></div>)
                    })}
                    
                  </IcePanel.Body>
                </IcePanel>
                <div className="main-panel">
                  <PieChart width={800} height={400}>
                    <Pie data={data02} dataKey="value" nameKey="name" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
                  </PieChart>
                </div>
                <div className="main-panel">
                  <CustomBarCharts ></CustomBarCharts>
                </div>
              </IceContainer>
           </div>)
  }
}
