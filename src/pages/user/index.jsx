import React, { Component } from 'react';
import {Table, Pagination,Button,Icon} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import axios from 'axios';
import {Link} from 'react-router';

const Column = Table.Column;

export default class User extends Component {

    constructor () {
        super();
        this.state = {
            dataSource: []
        }
    }
    componentDidMount () {
        axios.get('http://localhost:8080/user')
            .then((response) => {
                console.log(response);
                this.setState({dataSource: response.data});
            })
    }
    render() {
        console.log("---------------", this.state);
        return (  
            <IceContainer>
                <div>
                    <Link to='/user/add'><Icon type="add" /></Link>
                </div>
                <Table dataSource={this.state.dataSource||[]}>
                    <Column title="姓名" dataIndex="accountName" ></Column>
                    <Column title="电话" dataIndex="phone" ></Column>
                    <Column title="职务" dataIndex="accountName" ></Column>
                    <Column title="备注" dataIndex="remark" ></Column>
                </Table>
            </IceContainer>
        )
    }
} 