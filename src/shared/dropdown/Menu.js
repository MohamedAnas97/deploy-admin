import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookie from "react-cookies";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

const MenuButton = () => {
  const navigate = useNavigate();
  const logout = () => {
    Cookie.remove("token");
    navigate("/login");
  };
  const items = [
    {
      label: (
        <Link
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Link>
      ),
      key: "1",
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <Link onClick={(e) => e.preventDefault()} className="menu_button">
        <Space>
          Admin
          <UserOutlined />
        </Space>
      </Link>
    </Dropdown>
  );
};
export default MenuButton;
