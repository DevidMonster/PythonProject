import { useEffect, useState } from "react";
import { getAll, remove_post } from "../../../api/post";
import { Link } from 'react-router-dom';
import { Button, Image, Space, Table, Tag } from 'antd';
// import Dayjs from 'dayjs'
function PostList() {
    const [data, setData] = useState([])
    const fetchApi = async () => {
        const data = await getAll()
        setData(data)
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 200,
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (_, { images }) => <Image width={100} src={images[0]?.url}/>
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (_, { category }) => <p>{category?.name}</p>
        },
        {
            title: 'SubTitle',
            dataIndex: 'subTitle',
            key: 'subTitle',
            width: 200,
            render: (_, { subTitle }) => <p>{subTitle}</p>
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (_, { content }) => <p style={{WebkitLineClamp: '4', wordBreak: 'break-word', overflowWrap: 'break-word',textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical'}}>{content}</p>
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => {
                let color = status ? 'geekblue' : 'green';
                if (status == false) {
                    color = 'volcano';
                }
                return (
                    <Tag color={color} key={status}>
                        {status ? 'Visible' : 'InVisible'}
                    </Tag>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={'/admin/post/edit/' + record.id}><Button>Invite</Button></Link>
                    <Button  danger type="primary" onClick={async () => {
                        const isValid = confirm('Are you sure you want to delete this?')

                        if (isValid) {
                            await remove_post(record.id)
                            await fetchApi()
                        } else {
                            console.log('cancel');
                        }
                    }}>Delete</Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchApi()
    }, [])
    return (
        <Table columns={columns} dataSource={data} />
    );
}

export default PostList;