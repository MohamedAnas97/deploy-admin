// Layout
import Layout from "../shared/layout";
import Login from "../component/login/login";
import { Routes, Route, useNavigate } from "react-router-dom";
import CorporatePartners from "../component/corporatePartners/corporatePartners";
import PropertyOwners from "../component/propertyOwners/propertyOwners";
import ReferFriend from "../component/referFriend/referFriend";
import ContactUs from "../component/contactUs/contactUs";
import { useEffect, useState } from "react";
// cookie
import cookie from "react-cookies";

const AllRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // useEffect for loggedIn user to check
  useEffect(() => {
    let token = cookie.load("token");
    if (token !== undefined) {
      setLoggedIn(true);
    } else {
      navigate("/login");
      setLoggedIn(false);
    }
    // eslint-disable-next-line
  }, [cookie.load("token")]);

  return (
    <>
      {/* login page */}
      {!loggedIn ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<CorporatePartners />} />
            <Route path="/property-owners" element={<PropertyOwners />} />
            <Route path="/refer-friend" element={<ReferFriend />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};
export default AllRoutes;
