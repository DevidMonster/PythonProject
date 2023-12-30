import { Button, Form, Input } from 'antd';
import { add_category } from '../../../api/category';
import { useNavigate } from 'react-router-dom';
const AddCategory = () => {
    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log('Success:', values);
        await add_category(values)
        navigate('/admin/category')
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
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
export default AddCategory;