import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
    DesktopOutlined, MenuOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Post', '1', <DesktopOutlined />, [
        getItem(<Link to={'/admin/post'}>Post List</Link>, '1.1'),
        getItem(<Link to={'/admin/post/add'}>Add Post</Link>, '1.2'),
    ]),
    getItem('Category', '2', <MenuOutlined />, [
        getItem(<Link to={'/admin/category'}>Category List</Link>, '2.1'),
        getItem(<Link to={'/admin/category/add'}>Add Category</Link>, '2.2'),
    ]),
];
const DefaultLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '30px',
                    }}
                >
                    {/* <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div
                        style={{
                            padding: 24,
                            minHeight: '100vh',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default DefaultLayout;