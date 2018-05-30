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
import TypeSelect from '../../components/typeSelect.js';
import CenterSelect from '../../components/monitorCenterSelect';

const { Row, Col } = Grid;
export default class AddMonitorNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
   }

  }
  componentDidMount(){
    let id = this.props.location.query.query;
    if(id){
         axios.get('http://localhost:8080/monitorNode/get/' + id)
            .then((response) => {
                var data = response.data;
                this.setState({value: data});
            })

    }
  }

 onSubmit = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
       console.log('errors', errors); 
      } else {
        axios({
          url: 'http://localhost:8080/monitorNode/save',
          method: 'post',
          data: values
        }).then((response) => {
          if (response.data) {
            browserHistory.push('/monitorNode');
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
            <h2 style={styles.formTitle}>添加监控节点</h2>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                节点名称：
                </Col>
              <Col span="10">
                <IceFormBinder name="nodeName" required message="必填">
                  <Input size="large" placeholder="请输入中心名" />
                </IceFormBinder>
                <IceFormError name="nodeName" />
              </Col>
            </Row>

            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                节点类型：
                </Col>
              <Col span="10">
                <IceFormBinder name="typeID" required message="必填">
                  <TypeSelect placeholder="请选择···" />
                </IceFormBinder>
                <IceFormError name="typeID" />
              </Col>
            </Row>
            <Row style={styles.formItem}>
              <Col span="3" style={styles.formLabel}>
                所属监控中心：
                </Col>
              <Col span="10">
                <IceFormBinder name="monitorCenterID" required message="必填">
                  <CenterSelect placeholder="请选择···" />
                </IceFormBinder>
                <IceFormError name="moniterCenterID" />
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
