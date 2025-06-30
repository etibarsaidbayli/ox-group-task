import React from "react";

import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button, Layout, Menu} from "antd";
import type { MenuProps } from "antd";

import {clearToken} from "../../utils/auth";

const { Header, Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
		const location  = useLocation();
		const navigate = useNavigate();

		const handleLogOut = () => {
			clearToken();
			navigate('/login') ;
		};

		const items: MenuProps["items"] = [
		{
			label: <Link to="/products">Products</Link>,
			key: "/products",
		},
		{
			label: <Link to="/search">Search</Link>,
			key: "/search",
		},
	];

		return (
		 <Layout>
			 <Header  style={{
				 display: "flex",
				 justifyContent: "space-between",
				 alignItems: "center",
				 background: "#fff",
				 padding: "0 24px",
			 }}>
				 <Menu
				  theme="light"
				  mode="horizontal"
				  selectedKeys={[location.pathname]}
				  items={items}
				  style={{ flex: 1 }}
				 />
				 <Button type="primary" onClick={handleLogOut}>
					 Log Out
				 </Button>
			 </Header>

			 <Content style={{ padding: "24px" }}>
				 <div style={{ background: "#fff", padding: 24, minHeight: "80vh" }}>
					 {children}
				 </div>
			 </Content>
		 </Layout>
		)
}

export default AppLayout;