import React, { Component } from 'react';
import { Input, Grid, Button, Select}from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {Link} from 'react-router';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import axios from 'axios';
import {browserHistory} from 'react-router';

const { Row, Col } = Grid;
export default class AddPermission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
   }

  }

 onSubmit = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
       console.log('errors', errors); 
      } else {
        console.log('param is ', values);
        axios({
          url: 'http://localhost:8080/permission/save',
          method: 'post',
          data: values
        }).then((response) => {
          if (response.data) {
            console.log("success");
            browserHistory.push('/permission');
          }
        });
      }
    });
  };
  formChange = (formValue) => {
    this.setState({value: formValue})
  }
  

  render() {
    return (<div className="user-form">
      <IceContainer>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>添加权限</h2>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                名称：
                </Col>
              <Col span="10">
                <IceFormBinder name="permissionName" required message="必填">
                  <Input size="large" placeholder="请输入权限名" />
                </IceFormBinder>
                <IceFormError name="permissionName" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                权限编号：
                </Col>
              <Col span="10">
                <IceFormBinder name="permissionCode" required message="必填">
                  <Input size="large" placeholder="请输入权限编号" />
                </IceFormBinder>
                <IceFormError name="permissionCode" />
              </Col>
            </Row>
            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                备注：
                </Col>
              <Col span="10">
                <IceFormBinder
                  name="remark">
                  <Input size="large" placeholder="请输入备注" />
                </IceFormBinder>
              </Col>
            </Row>
         </div>
        </IceFormBinderWrapper>

        <Row style={{ marginTop: 20 }}>
          <Col offset="3">
            <Button
              size="large"
              type="primary"
              onClick={this.onSubmit}
            >
              提 交
              </Button>
          </Col>
        </Row>
      </IceContainer>
    </div>
    )
  }
}
const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
