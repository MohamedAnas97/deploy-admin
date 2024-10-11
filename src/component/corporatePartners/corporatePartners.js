import { Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
const CorporatePartners = () => {
  const [corporatePartners, setCorporatePartners] = useState([]);
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
      .get(`${process.env.REACT_APP_FRONTED_URL}/form/corp/list`, config)
      .then((corporatePartners) => {
        setCorporatePartners(corporatePartners?.data);
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
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
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

  console.log("gggg", corporatePartners);
  return (
    <div>
      <div className="header">
        <h3>All Corporate Partners</h3>
      </div>
      {/* table */}
      <Table
        columns={columns}
        dataSource={corporatePartners?.data}
        pagination={false}
        loading={loader}
        scroll={{ x: 1023 }}
      />
    </div>
  );
};
export default CorporatePartners;
