import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'antd/dist/antd.css';
import '../css/login.css';
import Facebook from '../component/Facebook';
import Google from '../component/Google';

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, history } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { logAccount } = this.props;
        Promise.resolve(logAccount(values.Username, values.Password)).then(
          () => {
            const tokens = localStorage.token;
            if (tokens === undefined) {
              Swal.fire({
                type: 'success',
                title: 'Register succeed',
                confirmButtonText: 'LOGIN'
              }).then(result => {
                if (result.value) {
                  history.push('/login');
                }
              });
            } else {
              history.push('/home');
            }
          }
        );
      }
    });
  };

  render() {
    const { form, state } = this.props;
    const { getFieldDecorator } = form;

    const { pending } = state;

    return (
      <div className="shadow-lg mt-5 p-5 Container">
        <h3 className="h3">LOGIN</h3>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('Username', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                type="email"
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('Password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          {pending ? (
            <div
              style={{
                background: 'white',
                width: '100%',
                height: '100%',
                opacity: '60%',
                zIndex: 1
              }}
            >
              <Icon type="loading" style={{ fontSize: 24 }} />
            </div>
          ) : (
            ''
          )}
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="App">
          <Facebook />
          or
          <Google />
          
        </div>
        
      </div>
    );
  }
}
export default Form.create()(withRouter(Login));
