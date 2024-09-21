import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/yuapi-backend/interfaceInfoController';
import {useParams} from '@@/exports';
import {PageContainer} from '@ant-design/pro-components';
import {Badge, Button, Card, Descriptions, Divider, Form, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {formatParamsToJson, formatTime} from '@/composables';
import CodeBlock from '@/pages/InterfaceInfo/components/CodeBlock';
import {Editor} from "@monaco-editor/react";

/**
 * 主页
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [editorValue, setEditorValue] = useState<string | undefined>(undefined);

  const [formRef] = Form.useForm();

  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data);
      // 同步更新编辑器和表单的值
      setEditorValue(formatParamsToJson(JSON.parse(res.data?.requestParams ?? '{}')));
      formRef.setFieldsValue({
        userRequestParams: formatParamsToJson(JSON.parse(res.data?.requestParams ?? '{}')),
      });
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onChange = (newValue: string | undefined) => {
    // 同步更新编辑器和表单的值
    setEditorValue(newValue ?? '');
    formRef.setFieldsValue({
      userRequestParams: newValue ?? '',
    });
  }

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });
      setInvokeRes(res.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  return (
    <PageContainer>
      <Card title="接口文档" loading={loading}>
        {data ? (
          <Descriptions title={data.name} bordered>
            <Descriptions.Item label="接口状态">
              <Badge
                status={data.status ? 'processing' : 'warning'}
                text={data.status ? '开启' : '关闭'}
              />
            </Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法"> {data.method} </Descriptions.Item>
            <Descriptions.Item label="创建时间">{formatTime(data.createTime)}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{formatTime(data.updateTime)}</Descriptions.Item>
            <Descriptions.Item label="请求参数">
              <CodeBlock code={data.requestParams} />
            </Descriptions.Item>
            <Descriptions.Item label="请求头">
              <CodeBlock code={data.requestHeader} />
            </Descriptions.Item>
            <Descriptions.Item label="响应头">
              <CodeBlock code={data.responseHeader} />
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Divider />
      <Card title="在线测试" loading={loading}>
        <Form form={formRef} name="invoke" layout="vertical" onFinish={onFinish}>
          <Form.Item name="userRequestParams">
            <Editor
              value={editorValue}
              onChange={onChange}
              language="json"
              theme="vs-light"
              height="180px"
              options={{
                minimap: { enabled: false }, // 禁用右侧的缩略预览
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
