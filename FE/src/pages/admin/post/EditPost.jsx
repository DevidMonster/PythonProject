import { Button, Form, Input, Select, Upload, message } from 'antd';//DatePicker
import TextArea from 'antd/es/input/TextArea';
// import Dayjs from 'dayjs';
import { getOne, update_post } from '../../../api/post';
import { getAll } from '../../../api/category';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { uploadImages } from '../../../api/upload';
import { UploadOutlined } from '@ant-design/icons';
const EditPost = () => {
    // const { RangePicker } = DatePicker;
    const [categories, setCategories] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState([])

    const dummyRequest = ({ onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleBeforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Kích thước hình ảnh không được vượt quá 10MB!');
        }

        return isJpgOrPng && isLt10M;
    };

    const handleOnChange = ({ fileList }) => {
        form?.setFieldValue('images', fileList)
        setFileList(fileList)
    }

    useEffect(() => {   
        if(id && form) {
            (async () => {
                const managerRes = await getAll()
                const res = await getOne(id)
                form.setFieldsValue({
                    title: res.title,
                    subTitle: res.subTitle,
                    category: res.category.id,
                    // date: [Dayjs(res.start_date), Dayjs(res.end_date)],
                    content: res.content,
                    status: res.status
                })
                setCategories(managerRes)

                if (res.images && res.images.length > 0) {
                    const images = res?.images?.map((image, index) => ({
                        uid: index.toString(),
                        name: 'image.png',
                        status: 'done',
                        url: image.url,
                    }))
                    form?.setFieldValue('images', images)
                    console.log(images);
                    
                    setFileList(images)
                }
            })()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const onFinish = async (values) => {
        // values.start_date = Dayjs(values.date[0]).format('YYYY-MM-DD');
        // values.end_date = Dayjs(values.date[1]).format('YYYY-MM-DD');
        // delete values.date;
        console.log('Success:', values);
        if(fileList.length > 0) {
            const image_urls = await uploadImages(fileList)
            values.images = image_urls
        }
        await update_post(id, values)
        navigate('/admin/post')
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
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Title!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="SubTitle"
                name="subTitle"
                rules={[
                    {
                        required: true,
                        message: 'Please input your SubTitle!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={'images'}
                label="Images"
                initialValue={fileList}
            >
                <Upload
                    beforeUpload={handleBeforeUpload}
                    customRequest={dummyRequest}
                    onChange={handleOnChange}
                    listType="picture-card"
                    fileList={fileList}
                >
                    {fileList.length === 3 ? "" : <UploadOutlined />}
                </Upload>
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[
                    {
                        required: true,
                        message: 'Please choose a category!',
                    },
                ]}
            >
                <Select>
                    <Select.Option value=''>Choose Manager</Select.Option>
                    {categories.map((item, index) => (
                        <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            {/* <Form.Item
                name={'date'}
                label={'Ngày bắt đầu'}
                rules={[
                    { required: true, message: 'Vui lòng điền ngày bắt đầu và kết thúc mã khuyến mãi !' }
                ]}
            >
                <RangePicker format={'DD/MM/YYYY'} />
            </Form.Item> */}
            <Form.Item
                label="Content"
                name="content"
                rules={[
                    {
                        required: true,
                        message: 'Please input your content!',
                    },
                ]}
            >
                <TextArea />
            </Form.Item>
            <Form.Item
                label="Status"
                name="status"
                rules={[
                    {
                        required: true,
                        message: 'Please choose a status!',
                    },
                ]}
            >
                <Select>
                    <Select.Option value={true}>Visible</Select.Option>
                    <Select.Option value={false}>InVisible</Select.Option>
                </Select>
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
export default EditPost;