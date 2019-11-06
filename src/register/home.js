import React from 'react';
import Swal from 'sweetalert2';
import { Upload, Form, Input, Button, Icon, Select, message } from 'antd';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../css/login.css';

const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { form, history, restartGame } = this.props;
    restartGame();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values.avatar);
        const { registerAcc } = this.props;
        Promise.resolve(
          registerAcc(
            values.Username,
            values.Password,
            values.gmail,
            values.gender,
            `https://restfullapi-1612241.herokuapp.com/images/${values.avatar.file.name}`
            )
        ).then(() => {
          const { state } = this.props;
          if (state.error.status === '200') {
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
            Swal.fire({
              type: 'error',
              title: 'Account already exists for your email address'
            });
          }
        });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { state } = this.props;
    const { pending } = state;
    const { loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className="shadow-lg mt-5 p-5 register">
        <h3 className="h3">REGISTER</h3>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('Username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('Password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('gmail', {
              rules: [{ required: true, message: 'Please input your gmail!' }]
            })(
              <Input
                type="email"
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="gmail"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please input your gender!' }]
            })(
              <Select
                placeholder="Select a gender"
                prefix={
                  <Icon type="man" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
              </Select>
            )}
          </Form.Item>
          
          <Form.Item>
            {getFieldDecorator('avatar', {
              rules: [
                { required: true, message: 'Please input link your avatar!' }
              ]
            })(
              <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://restfullapi-1612241.herokuapp.com/photo"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(withRouter(Register));
