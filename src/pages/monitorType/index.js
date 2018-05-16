import React, { Component } from 'react';
import {Table, Pagination,Button,Icon, Search} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import axios from 'axios';
import {Link} from 'react-router';

const Column = Table.Column;

export default class MonitorType extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: [],
            rowSelection: {
                onChange: this.rowOnChange.bind(this),
                selectedRowKeys: []
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
        axios.get('http://localhost:8080/monitorType')
            .then((response) => {
                console.log(response);
                this.setState({dataSource: response.data});
            })
    }
    deleteUser (id) {
        axios.get('http://localhost:8080/monitorType/delete/'+id)
            .then((response) => {
                if (response.data) {
                    console.log("success");
                    this.fecthdata();
                }
            })
    }
    render() {
        console.log("---------------", this.state);
        return (  
            <div>
                 <IceContainer>
                    <h2>节点类型</h2>
                    <Search size="large" hasIcon inputWidth={280}/>
                </IceContainer>

            <IceContainer>
                <div>
                    <Link to='/monitorType/add'><Icon type="add" /></Link>
                </div>
                <Table 
                    rowSelection={this.state.rowSelection}
                    primaryKey="typeID"
                    dataSource={this.state.dataSource||[]}>
                    <Column title="类型名称" dataIndex="typeName" ></Column>
                    <Column title="备注" dataIndex="remark" />
                    <Column cell={(value, index, record) => { 
                        return <div><span className="table_cell-option" onClick = {this.deleteUser.bind(this, record.typeID)}><Icon type="ashbin" /></span><span className="table_cell-option"><Icon type="edit" /></span></div>
                            }
                        }/>
                </Table>
            </IceContainer>
            </div>
        )
    }
}