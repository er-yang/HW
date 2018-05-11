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
export default class AddMonitorCenter extends React.Component {
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
          url: 'http://localhost:8080/monitorCenter/save',
          method: 'post',
          data: values
        }).then((response) => {
          if (response.data) {
            console.log("success");
            browserHistory.push('/monitorCenter');
          }
        });
      }
    });
  };
  formChange = (formValue) => {
    this.setState({value: formValue})
  }
  

  render() {
    return (<div className="form">
      <IceContainer>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formContent}>
            <h2 style={styles.formTitle}>添加摄像头</h2>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                中心名称：
                </Col>
              <Col span="10">
                <IceFormBinder name="centorName" required message="必填">
                  <Input size="large" placeholder="请输入设备名" />
                </IceFormBinder>
                <IceFormError name="centerName" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                ip：
                </Col>
              <Col span="10">
                <IceFormBinder name="ip" required message="必填">
                  <Input size="large" placeholder="请输入通信地址" />
                </IceFormBinder>
                <IceFormError name="ip" />
              </Col>
            </Row>


            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                经度：
                </Col>
              <Col span="10">
                <IceFormBinder name="longitude">
                  <Input size="large" placeholder="请输入经度" />
                </IceFormBinder>
                <IceFormError name="phone" />
              </Col>
            </Row>
            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                纬度：
                </Col>
              <Col span="10">
                <IceFormBinder name="latitude">
                  <Input size="large" placeholder="请输入纬度" />
                </IceFormBinder>
                <IceFormError name="latitude" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                地址：
                </Col>
              <Col span="10">
                <IceFormBinder name="address">
                  <Input size="large" placeholder="请输入地址" />
                </IceFormBinder>
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
