import React, { Component } from 'react';
import {Map, Markers, InfoWindow} from 'react-amap';
import axios from 'axios';
 
export default class AccidentAmap extends Component {
    constructor (props) {
        super(props);
        this.state = {
            marker:{
                position:[]
            },
            plugins: ["Scale", "ToolBar", "MapType"],
            useCluster: true,
            infoWindow: {
                visible: true,
                position: {latitude:106.528737, longitude: 29.520085},
                content: "hhh",
                offset: [0, 0],
                size: {
                    width: 200,
                    height: 140,
                }
            }
        };
         this.markersEvents = {
            click: (e, marker) => {
                // 通过高德原生提供的 getExtData 方法获取原始数据
                const extData = marker.getExtData();
                let position = extData.position;
                this.setState({infoWindow:{visible: !this.state.infoWindow.visible,
                     position: {longitude:position[0],latitude: position[1]},
                    context: extData.content}});
            }
         }
    }
    componentDidMount(){
        axios({
          url: 'http://localhost:8080/accident',
          method: 'get'
        }).then((response) => {
          if (response.data) {
              let nodeArray =response.data.data;
                let markers = nodeArray.map(function(value, index){
                    let marker = {position: [parseFloat(value.longitude), parseFloat(value.latitude)],
                                  title: value.nodeName,
                                  animation: "AMAP_ANIMATION_DROP",
                                 content: "<p>"+value.accidentType+"</p><p>"+value.description+"</p>"};
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
                this.state.marker !=={}&&<Markers markers={this.state.marker} events={this.markersEvents} useCluster={this.state.useCluster}></Markers>
             }
             {/* <InfoWindow
            position={{latitude:106.528737, longitude: 29.520085}}
            visible={true}
            isCustom={false}
            content={"<h1>ad</h1>"}
          /> */}
            </Map>
            </div>
        )
    }
}