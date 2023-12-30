import { Button, Form, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { update_category, getOne } from '../../../api/category';
const EditCategory = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    useEffect(() => {
        if(id && form) {
            (async () => {
                const res = await getOne(id)
                form.setFieldsValue({
                    name: res.name
                })
            })()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const onFinish = async (values) => {
        console.log('Success:', values);
        await update_category(id, values)
        navigate('/admin/category')
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Category Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input Category name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button danger type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};
export default EditCategory;