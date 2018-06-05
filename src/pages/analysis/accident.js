import React, { Component } from 'react';
import {Table, Pagination,Button,Icon, Search} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import axios from 'axios';
import {Link} from 'react-router';

const Column = Table.Column;

export default class Accident extends Component {

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
    rowOnChange(ids, record) {
        let { rowSelection } = this.state;
        rowSelection.selectedRowKeys = ids;
        this.setState({ rowSelection });

    }

    componentDidMount () {
       this.fecthdata(); 
    }
    fecthdata () {
        axios.get('http://localhost:8080/accident')
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
                    <h2>事故记录</h2>
                    <Search size="large" hasIcon inputWidth={280}/>
                </IceContainer>

            <IceContainer>
                
                <Table 
                    rowSelection={this.state.rowSelection}
                    primaryKey="accidentID"
                    dataSource={this.state.dataSource||[]}>
                    <Column title="类型" dataIndex="accidentType" ></Column>
                    <Column title="描述" dataIndex="description" />
                    <Column title="时间" dataIndex="occurTime" ></Column>
                    <Column title="是否处理" dataIndex="state" cell={(value, index, record) => {return value==1?"已解决":"待解决"}} />
                    <Column title="备注" dataIndex="remark" ></Column>

                </Table>
            <div style={{textAlign:"right", paddingTop: "26px"}}>
            <Pagination
              current={this.state.page}
              pageSize={this.state.size}
              total={this.state.total}
              onChange={this.changePage}
            />
          </div>


            </IceContainer>
      
            </div>
        )
    }
}