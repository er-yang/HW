import React, { Component } from 'react';
import {Map, Markers} from 'react-amap';
import axios from 'axios';
 
export default class Amap extends Component {
    constructor (props) {
        super(props);
        this.state = {
            marker:{
                position:[]
            },
            plugins: ["Scale", "ToolBar", "MapType"],
            useCluster: true,
        }
    }
    componentDidMount(){
        axios({
          url: 'http://localhost:8080/monitorNode',
          method: 'get'
        }).then((response) => {
          if (response.data) {
              let nodeArray =response.data.data;
                let markers = nodeArray.map(function(value, index){
                    let marker = {position: [parseFloat(value.longitude), parseFloat(value.latitude)],
                                  title: value.nodeName,
                                  animation: "AMAP_ANIMATION_DROP"
                                  
                                 };
                                  return marker;
                });
                this.setState({marker: markers});
          }
        });
    }
    render () {
        console.log("this state is ",this.state);
        return (
            <div className="map-container" style={{width: '100%', height: '500px'}}>
            <Map amapkey={'ac561bbb6ed1c23ea025f1f645bc3b3e'} plugins={this.state.plugins}>
            {
                this.state.marker !=={}&&<Markers markers={this.state.marker} ></Markers>
             }
            </Map>
            </div>
        )
    }
}