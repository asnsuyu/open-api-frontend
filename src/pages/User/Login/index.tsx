import Footer from '@/components/Footer';
import { userLoginUsingPOST } from '@/services/yuapi-backend/userController';
// import { userLoginUsingPOST } from '@/services/yuapi-backend';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Alert, Checkbox, message, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');

  /** 提交事件 */
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPOST({
        ...values,
      });

      if (res.data) {
        const urlParams = new URL(window.location.href).searchParams;
        // 先 设置用户登录态
        setInitialState((s) => ({ ...s, loginUser: res.data }));
        // 后 跳转
        history.push(urlParams.get('redirect') ?? '/');
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  const { status, type: loginType } = userLoginState;

  /** 多选框选中或取消 */
  const [autoFill, setAutoFill] = useState<boolean>(true);
  const handleCheckBoxClick = (e: any) => {
    const isChecked = e.target.checked;
    setAutoFill(isChecked);
  }

  /** 处理登录按钮点击事件 */
  const handleLoginButtonClick = async (values: API.UserLoginRequest) => {
    if (!autoFill) {
      await handleSubmit(values);
    } else {
      const autoValues = {
        userAccount: 'admin',
        userPassword: '12345678',
      };
      await handleSubmit(autoValues)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={ <img alt="logo" src="/open-api_logo.png" /> }
          title="云链"
          subTitle={'「接口调用开放平台」'}
          initialValues={{
            autoLogin: true,
          }}
          // actions={[
          //   '其他登录方式 :',
          //   <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
          //   <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
          //   <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          // ]}
          // onFinish={async (values) => {
          //   await handleSubmit(values as API.UserLoginRequest);
          // }}
          onFinish={handleLoginButtonClick}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              // {
              //   key: 'mobile',
              //   label: '手机号登录',
              // },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              {/* 手动输入 */}
              {!autoFill && (
                <>
                  <ProFormText
                    name="userAccount"
                    fieldProps={{
                      size: 'large',
                      prefix: <UserOutlined className={styles.prefixIcon} />,
                    }}
                    rules={[
                      {
                        required: true,
                        message: '用户名是必填项！',
                      },
                    ]}
                    placeholder={'用户名: user or admin'}
                  />
                  <ProFormText.Password
                    name="userPassword"
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={styles.prefixIcon} />,
                    }}
                    placeholder={'密码: 12345678'}
                    rules={[
                      {
                        required: true,
                        message: '密码是必填项！',
                      },
                    ]}
                  />
                </>
              )}
              {/* 自动输入 */}
              {autoFill && (
                <>
                  <ProFormText
                    name="userAccount"
                    fieldProps={{
                      size: 'large',
                      prefix: <UserOutlined className={styles.prefixIcon} />,
                      value: 'admin'
                    }}
                    rules={[
                      {
                        required: false,
                        message: '用户名是必填项！',
                      },
                    ]}
                    placeholder={'用户名: user or admin'}
                  />
                  <ProFormText.Password
                    name="userPassword"
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined className={styles.prefixIcon} />,
                      value: '12345678'
                    }}
                    placeholder={'密码: 12345678'}
                    rules={[
                      {
                        required: false,
                        message: '密码是必填项！',
                      },
                    ]}
                  />
                </>
              )}
            </>
          )}

          {/*{status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}*/}
          {/*{type === 'mobile' && (*/}
          {/*  <>*/}
          {/*    <ProFormText*/}
          {/*      fieldProps={{*/}
          {/*        size: 'large',*/}
          {/*        prefix: <MobileOutlined className={styles.prefixIcon} />,*/}
          {/*      }}*/}
          {/*      name="mobile"*/}
          {/*      placeholder={'请输入手机号！'}*/}
          {/*      rules={[*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: '手机号是必填项！',*/}
          {/*        },*/}
          {/*        {*/}
          {/*          pattern: /^1\d{10}$/,*/}
          {/*          message: '不合法的手机号！',*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*    />*/}
          {/*    <ProFormCaptcha*/}
          {/*      fieldProps={{*/}
          {/*        size: 'large',*/}
          {/*        prefix: <LockOutlined className={styles.prefixIcon} />,*/}
          {/*      }}*/}
          {/*      captchaProps={{*/}
          {/*        size: 'large',*/}
          {/*      }}*/}
          {/*      placeholder={'请输入验证码！'}*/}
          {/*      captchaTextRender={(timing, count) => {*/}
          {/*        if (timing) {*/}
          {/*          return `${count} ${'秒后重新获取'}`;*/}
          {/*        }*/}
          {/*        return '获取验证码';*/}
          {/*      }}*/}
          {/*      name="captcha"*/}
          {/*      rules={[*/}
          {/*        {*/}
          {/*          required: true,*/}
          {/*          message: '验证码是必填项！',*/}
          {/*        },*/}
          {/*      ]}*/}
          {/*      onGetCaptcha={async (phone) => {*/}
          {/*        const result = await getFakeCaptcha({*/}
          {/*          phone,*/}
          {/*        });*/}
          {/*        // @ts-ignore*/}
          {/*        if (result === false) {*/}
          {/*          return;*/}
          {/*        }*/}
          {/*        message.success('获取验证码成功！验证码为：1234');*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </>*/}
          {/*)}*/}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Checkbox
              checked={autoFill}
              onChange={handleCheckBoxClick}
            >
              自动填写账号密码
            </Checkbox>
            {/*<ProFormCheckbox*/}
            {/*  name="autoLogin1"*/}
            {/*  noStyle*/}
            {/*>*/}
            {/*  自动登录*/}
            {/*</ProFormCheckbox>*/}
            {/*<a*/}
            {/*  style={{*/}
            {/*    float: 'right',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  忘记密码 ?*/}
            {/*</a>*/}
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
