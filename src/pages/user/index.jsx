import React, { Component } from 'react';
import {Table, Pagination,Button,Icon} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import axios from 'axios';
import {Link} from 'react-router';
import './user.scss';

const Column = Table.Column;

export default class User extends Component {

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
        console.log("ids =",ids," rescord", record);
        rowSelection.selectedRowKeys = ids;
        this.setState({ rowSelection });

    }

    componentDidMount () {
       this.fecthdata(); 
    }
    fecthdata () {
        axios.get('http://localhost:8080/user')
            .then((response) => {
                console.log(response);
                this.setState({dataSource: response.data});
            })
    }
    deleteUser (id) {
        axios.get('http://localhost:8080/user/delete/'+id)
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
                    <Link to='/user/add'><Icon type="add" /></Link>
                </div>
                <Table 
                    rowSelection={this.state.rowSelection}
                    primaryKey="accountID"
                    dataSource={this.state.dataSource||[]}>
                    <Column title="姓名" dataIndex="accountName" ></Column>
                    <Column title="工号" dataIndex="accountCode" />
                    <Column title="电话" dataIndex="phone" ></Column>
                    <Column title="部门" dataIndex="accountName" ></Column>
                    <Column title="状态" dataIndex="state" ></Column>
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