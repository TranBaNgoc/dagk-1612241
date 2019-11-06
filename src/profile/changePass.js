import React from 'react';
// import Swal from 'sweetalert2';
import { Form, Input, Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'antd/dist/antd.css';
import '../css/login.css';

class ChangPass extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form,state,history, updatePassword} = this.props;
    const { currentUser  } = state;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received : ', values);
        if(currentUser.Password !== values.oldPasss)
        Swal.fire({
          type: 'error',
          title: 'Oldpassword is not correct!!!',
          text: 'Try again!!!'
        });
          
        else if(values.newPasss !== values.newPass)
        Swal.fire({
          type: 'error',
          title: 'New password is not corect!!!',
          text: 'Try again!!!'
        });
        else
         updatePassword(currentUser.ID,currentUser.gmail,currentUser.Username,currentUser.gender, currentUser.avatar, 
          values.newPass)
          Swal.fire({
            type: 'success',
            title: 'Change password success',
            confirmButtonText: 'HOME'
          }).then(result => {
            if (result.value) {
              history.push('/home');
            }
          });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="shadow-lg mt-5 p-5 changpass">
        <h3 className="App" >CHANGE PASSWORD</h3>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('oldPasss', {
              rules: [
                { required: true, message: 'Please input your old Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Old password"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('newPass', {
              rules: [
                { required: true, message: 'Please input your new Psassword!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="New password"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('newPasss', {
              rules: [
                { required: true, message: 'Please input your new Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="New password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              UPDATE
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(withRouter(ChangPass));
