import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../utils/ApiService";
import { toast } from "react-toastify";

function EditUser() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [batch, setBatch] = useState("");
  let [mobile, setMobile] = useState("");
  let { id } = useParams();
  let navigate = useNavigate();
  let handleEdit = async () => {
    try {
      let res = await ApiService.put(`/users/${id}`, {
        id,
        name,
        email,
        batch,
        mobile,
      });
      if (res.status === 200) {
        // toast.success("User Updated Successfully")
        navigate("/dashboard");
      }
    } catch (error) {}
  };
  let getData = async () => {
    try {
      let res = await ApiService.get(`/users/${id}`);
      if (res.status === 200) {
        setName(res.data.name);
        setMobile(res.data.mobile);
        setBatch(res.data.batch);
        setEmail(res.data.email);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Batch</Form.Label>
              <Form.Control
                type="text"
                placeholder="Batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={() => handleEdit()}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
