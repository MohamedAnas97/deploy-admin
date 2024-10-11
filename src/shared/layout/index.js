import Logo from "../../assets/dashboard/logo1.png";
import Logo2 from "../../assets/dashboard/iconf.png";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  KeyOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import MenuButton from "../dropdown/Menu";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Layout1 = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  function getItem(label, key, icon, children, theme) {
    return {
      key,
      icon,
      children,
      label,
      theme,
    };
  }
  const items = [
    getItem(<Link to="/">Corporate Partners</Link>, "1", <TeamOutlined />),
    getItem(
      <Link to="/property-owners">Property Owners</Link>,
      "2",
      <KeyOutlined />
    ),
    getItem(
      <Link to="/refer-friend">Refer a Friend</Link>,
      "3",
      <UserSwitchOutlined />
    ),
    getItem(<Link to="/contact-us">Contact Us</Link>, "4", <PhoneOutlined />),
  ];

  return (
    <Layout style={{ height: "100vh", width: "100%" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ width: "320px" }}
        className={collapsed ? "" : "sidenav-custom-width"}
      >
        <div className="demo-logo-vertical" />
        <div className="sidebar_logo flex justify-center">
          {!collapsed ? (
            <img src={Logo} alt="" style={{ height: "40px" }} />
          ) : (
            <img src={Logo2} alt="" style={{ height: "50px", width: "50px" }} />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={items}
          style={{ paddingTop: "35px" }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "20px",
              width: 64,
              height: 64,
            }}
          />
          <MenuButton />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowY: "scroll",
          }}
        >
          {props?.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layout1;
