import React from 'react';
// import Swal from 'sweetalert2';
import { Upload, Form, Input, Button, Icon, Select, message } from 'antd';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

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

class Profile extends React.Component {
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

  componentDidMount = () => {
    const { form, state } = this.props;
    form.setFieldsValue({
      gmail: state.currentUser.gmail,
      Username: state.currentUser.Username,
      gender: state.currentUser.state,
      avatar: state.currentUser.avatar
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, state, updateProfile, history } = this.props;
    const { currentUser } = state;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received : ', values);
        updateProfile(
          currentUser.ID,
          values.gmail,
          values.Username,
          values.gender,
          `https://restfullapi-1612241.herokuapp.com/images/${values.avatar.file.name}` ?
          `https://restfullapi-1612241.herokuapp.com/images/${values.avatar.file.name}`: values.avatar.file.name,
          currentUser.Password
        );
        Swal.fire({
          type: 'success',
          title: 'Change your infor success',
          confirmButtonText: 'Home'
        }).then(result => {
          if (result.value) {
            history.push('/home');
          }
        });
      }
    });
  };

  render() {
    const { form, state } = this.props;
    const { getFieldDecorator } = form;
    const { currentUser } = state;

    const { loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className="shadow-lg mt-5  p-5 register">
        <h3 className="h3">UPDATE INFOR</h3>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('gmail', {
              rules: [{ required: true, message: 'Please input your gmail!' }]
            })(
              <Input
                disabled
                type="email"
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="gmail"
              />
            )}
          </Form.Item>
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
                <img
                  src={imageUrl || currentUser.avatar}
                  alt="avatar"
                  style={{ width: '100%' }}
                />
              </Upload>
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
            <a href="/editpassword">Change password!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Form.create()(withRouter(Profile));
