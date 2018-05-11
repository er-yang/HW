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
export default class AddUser extends React.Component {
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
          url: 'http://localhost:8080/user/save',
          method: 'post',
          data: values
        }).then((response) => {
          if (response.data) {
            console.log("success");
            browserHistory.push('/user');
          }
        });
      }
    });
  };
  formChange = (formValue) => {
    this.setState({value: formValue})
  }
  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
      this.setState({password: values});
    }
  };
  checkPasswd2 = (rule, values, callback, stateValues) => {
    console.log('stateValues:', stateValues);
    if (values && values !== stateValues) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  render() {
    return (<div className="user-form">
      <IceContainer>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>添加用户</h2>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                用户名：
                </Col>
              <Col span="10">
                <IceFormBinder name="accountName" required message="必填">
                  <Input size="large" placeholder="请输入用户名" />
                </IceFormBinder>
                <IceFormError name="accountName" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                工号：
                </Col>
              <Col span="10">
                <IceFormBinder name="accountCode" required message="必填">
                  <Input size="large" placeholder="请输入工号" />
                </IceFormBinder>
                <IceFormError name="accountCode" />
              </Col>
            </Row>


            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                电话：
                </Col>
              <Col span="10">
                <IceFormBinder name="phone">
                  <Input size="large" placeholder="请输入电话" />
                </IceFormBinder>
                <IceFormError name="phone" />
              </Col>
            </Row>
            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                部门：
                </Col>
              <Col span="10">
                <IceFormBinder name="departmentID">
                  <Select
                    size="large"
                    placeholder="请选择..."
                    dataSource={[
                      { label: '省级监控中心', value: '1' },
                      { label: '县级监控中心', value: '2' },
                    ]}
                  />
                </IceFormBinder>
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                状态：
                </Col>
              <Col span="10">
                <IceFormBinder name="state">
                  <Select
                    size="large"
                    placeholder="请选择..."
                    dataSource={[
                      { label: '有效', value: '1' },
                      { label: '禁用', value: '0' },
                    ]}
                  />
                </IceFormBinder>
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                新密码：
                </Col>
              <Col span="10">
                <IceFormBinder
                  name="passWord"
                  required
                  validator={this.checkPasswd}
                >
                  <Input
                    htmlType="passWord"
                    size="large"
                    placeholder="请重新输入新密码"
                  />
                </IceFormBinder>
                <IceFormError name="passWord" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                确认密码：
                </Col>
              <Col span="10">
                <IceFormBinder
                  name="rePasswd"
                  required
                  validator={(rule, values, callback) =>
                    this.checkPasswd2(
                      rule,
                      values,
                      callback,
                      this.state.value.passWord
                    )
                  }
                >
                  <Input
                    htmlType="password"
                    size="large"
                    placeholder="两次输入密码保持一致"
                  />
                </IceFormBinder>
                <IceFormError name="rePasswd" />
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
