import { Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
const PropertyOwners = () => {
  const [propertyOwners, setPropertyOwners] = useState([]);
  const [loader, setLoader] = useState(true);

  const getPropertyHandler = () => {
    setLoader(true);
    // login token
    const token = cookie.load("token");
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` },
    };
    //axios call
    axios
      .get(
        `${process.env.REACT_APP_FRONTED_URL}/form/property_owner/list`,
        config
      )
      .then((response) => {
        setPropertyOwners(response?.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getPropertyHandler();
  }, []);
  const columns = [
    {
      title: "Full Name",
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
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "No of Bedrooms",
      dataIndex: "no_of_bedrooms",
      key: "no_of_bedrooms",
    },
    {
      title: "Apartment Type",
      dataIndex: "apartment_type",
      key: "apartment_type",
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
        <h3>All Property Owners</h3>
      </div>
      {/* table */}
      <Table
        columns={columns}
        dataSource={propertyOwners?.data}
        pagination={false}
        loading={loader}
        scroll={{ x: 1023 }}
      />
    </div>
  );
};
export default PropertyOwners;
