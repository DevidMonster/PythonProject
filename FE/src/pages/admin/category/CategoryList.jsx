import { useEffect, useState } from "react";
import { getAll, remove_category } from "../../../api/category";
import { Link } from 'react-router-dom';
import { Button, Space, Table } from 'antd';
function CategoryList() {
    const [data, setData] = useState([])
    const fetchApi = async () => {
        const data = await getAll()
        setData(data)
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 50
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width:100,
            render: (_, record) => (
                <Space size="middle">
                    <Link to={'/admin/category/edit/' + record.id}><Button>Invite</Button></Link>
                    <Button  danger type="primary" onClick={async () => {
                        const isValid = confirm('Are you sure you want to delete this?')

                        if (isValid) {
                            await remove_category(record.id)
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

export default CategoryList;