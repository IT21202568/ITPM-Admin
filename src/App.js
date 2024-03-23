import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "antd/dist/reset.css";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  TagOutlined,
} from "@ant-design/icons";
import Inventory from "./components/Inventory";
import Dashboard from "./components/Dashboard";
import Promotions from "./components/Promotions";
import Category from "./components/Category";
import Order from "./components/Order";


const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
              <Link to="/inventory">Inventory </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TagOutlined />}>
              <Link to="/promotions">Promotions</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<TagOutlined />}>
              <Link to="/categories">Categories</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<TagOutlined />}>
              <Link to="/orders">Orders</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "16px" }}>
            <Switch>
              <Route path="/dashboard">
                {" "}
                <Dashboard />{" "}
              </Route>
              <Route path="/inventory">
                <Inventory />
              </Route>
              <Route path="/promotions">
                <Promotions />
              </Route>
              <Route path="/categories">
                <Category />
              </Route>
              <Route path="/orders">
                <Order />
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Admin Panel ©2024 Created with ishop
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
