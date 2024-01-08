import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ApiService from "../utils/ApiService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup';

function AddUser() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      batch: ''
    },
    validationSchema: Yup.object({
      name:   Yup.string().required('Name is Required').max(20, 'Not exceed more than 20 characters').min(3, 'Atleast 3 characters'),
      email:  Yup.string().required('Email is Required').email('Email is not valid'),
      mobile: Yup.string().required('Mobile is Required').matches(/^\d{10}$/, 'Enter 10 digits') ,
      batch:  Yup.string().required('Batch is Required')
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        let res = await ApiService.post('/users', values);
        if (res.status === 201) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  // let [name, setName] = useState("");
  // let [email, setEmail] = useState("");
  // let [batch, setBatch] = useState("");
  // let [mobile, setMobile] = useState("");

  // let handleCreate = async () => {
  //   let data = { name, email, batch, mobile };
  //   let res = await ApiService.post("/users", data);
  //   if (res.status === 201) {
  //     // toast.success("User Added Successfully")
  //     navigate("/dashboard");
  //   }
  // };
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Add User</h1>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name" id="name" name="name"
                onChange={formik.handleChange}
                value={formik.values.name}  onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (<div style={{color:"red"}}>{formik.errors.name}</div>) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email" id="email" name="email"
                onChange={formik.handleChange}
                value={formik.values.email} onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (<div style={{color:"red"}}>{formik.errors.email}</div>) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile" id="mobile" name="mobile"
                onChange={formik.handleChange}
                value={formik.values.mobile} onBlur={formik.handleBlur}
              />
              {formik.touched.mobile && formik.errors.mobile ? (<div style={{color:"red"}}>{formik.errors.mobile}</div>) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Batch</Form.Label>
              <Form.Control
                type="text"
                placeholder="Batch" id="batch" name="batch"
                onChange={formik.handleChange}
                value={formik.values.batch} onBlur={formik.handleBlur}
              />
              {formik.touched.batch && formik.errors.batch ? (<div style={{color:"red"}}>{formik.errors.batch}</div>) : null}
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
