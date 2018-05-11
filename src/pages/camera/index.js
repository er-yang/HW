import React, { Component } from 'react';
import {Table, Pagination,Button,Icon} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import axios from 'axios';
import {Link} from 'react-router';

const Column = Table.Column;

export default class Camera extends Component {

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
        axios.get('http://localhost:8080/camera')
            .then((response) => {
                console.log(response);
                this.setState({dataSource: response.data});
            })
    }
    deleteUser (id) {
        axios.get('http://localhost:8080/camera/delete/'+id)
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
            <IceContainer>
                <div>
                    <Link to='/camera/add'><Icon type="add" /></Link>
                </div>
                <Table 
                    rowSelection={this.state.rowSelection}
                    primaryKey="cameraID"
                    dataSource={this.state.dataSource||[]}>
                    <Column title="名称" dataIndex="name" ></Column>
                    <Column title="地址" dataIndex="address" />
                    <Column title="ip" dataIndex="ip" ></Column>
                    <Column title="备注" dataIndex="remark" />
                    <Column cell={(value, index, record) => { 
                        return <div><span className="table_cell-option" onClick = {this.deleteUser.bind(this, record.accountID)}><Icon type="ashbin" /></span><span className="table_cell-option"><Icon type="edit" /></span></div>
                            }
                        }/>
                </Table>
            </IceContainer>
        )
    }
}