import { Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
const ContactUs = () => {
  const [contactUs, setContactUs] = useState([]);
  const [loader, setLoader] = useState(true);
  const getCorporateHandler = () => {
    setLoader(true);
    // login token
    const token = cookie.load("token");
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` },
    };
    //axios call
    axios
      .get(
        `${process.env.REACT_APP_FRONTED_URL}/form/contact/list`,
        config
      )
      .then((response) => {
        setContactUs(response?.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getCorporateHandler();
  }, []);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
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
        <h3>All Contact Us</h3>
      </div>
      {/* table */}

      <Table
        columns={columns}
        dataSource={contactUs?.data}
        loading={loader}
        pagination={false}
        scroll={{ x: 1023 }}
      />
    </div>
  );
};
export default ContactUs;
