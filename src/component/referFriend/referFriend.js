import { Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
const ReferFriend = () => {
  const [referFriend, setReferFriend] = useState([]);
  const [loader, setLoader] = useState(true);
  const getReferFriendHandler = () => {
    setLoader(true);
    // login token
    const token = cookie.load("token");
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` },
    };
    //axios call
    axios
      .get(
        `${process.env.REACT_APP_FRONTED_URL}/form/refer/list`,
        config
      )
      .then((response) => {
        setReferFriend(response?.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getReferFriendHandler();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Property Details",
      dataIndex: "property_details",
      key: "property_details",
    },
    {
        title: "Property Location",
        dataIndex: "property_location",
        key: "property_location",
      },
    {
      title: "Message",
      dataIndex: "contact_message",
      key: "contact_message",
    },
  ];
  return (
    <div>
      <div className="header">
        <h3>All Refer a Friend</h3>
      </div>
      {/* table */}
      <Table
        columns={columns}
        dataSource={referFriend?.data}
        pagination={false}
        loading={loader}
        scroll={{ x: 1023 }}
      />
    </div>
  );
};
export default ReferFriend;
