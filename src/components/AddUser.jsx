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
  var minBirthdate = new Date();
  minBirthdate.setFullYear(minBirthdate.getFullYear() - 18);
  const formik = useFormik({
    initialValues: {
      title: '',
      ISBNumber: '',
      publishedDate: '',
      author: {
        name: '',
        dob: '',
        bio: ''
      }
    },
    validationSchema: Yup.object({
      title:   Yup.string().required('title is Required').max(75, 'Not exceed more than 75 characters').min(3, 'Atleast 3 characters'),
      ISBNumber:  Yup.string().required('Number is Required'),
      publishedDate: Yup.date().required('Date is Required').max(new Date()),
      author: Yup.object({
        name: Yup.string().required('Author name is required').max(30, 'Not exceed more than 30 characters').min(3, 'Atleast 3 characters'),
        dob:Yup.date().required('Author DOB is required'),
        bio:Yup.string().required('Author Bio is required').max(250, 'Not exceed more than 250 characters').min(15, 'Atleast 15 characters'),
      })
    }),
    onSubmit: async (values) => {
      try {
        let res = await ApiService.post("/bookauthor", values);
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
            <h1 className="h3 mb-0 text-gray-800">Add Book and Author Details</h1>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <h3>Book Details</h3>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <div style={{ color: "red" }}>{formik.errors.title}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ISBN Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="ISBNumber"
                id="ISBNumber"
                name="ISBNumber"
                onChange={formik.handleChange}
                value={formik.values.ISBNumber}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ISBNumber && formik.errors.ISBNumber ? (
                <div style={{ color: "red" }}>{formik.errors.ISBNumber}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Publication Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date"
                id="publishedDate"
                name="publishedDate"
                onChange={formik.handleChange}
                value={formik.values.publishedDate}
                onBlur={formik.handleBlur}
              />
              {formik.touched.publishedDate && formik.errors.publishedDate ? (
                <div style={{ color: "red" }}>
                  {formik.errors.publishedDate}
                </div>
              ) : null}
            </Form.Group>
            <h3>Author Details</h3>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                name="author['name']"
                onChange={formik.handleChange}
                value={formik.values.author["name"]}
                onBlur={formik.handleBlur}
              />
              {formik.touched.author?.name && formik.errors.author?.name ? (
                <div style={{ color: "red" }}>{formik.errors.author?.name}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author DOB</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter author date of birth"
                name="author['dob']"
                onChange={formik.handleChange}
                value={formik.values.author["dob"]}
                onBlur={formik.handleBlur}
              />
              {formik.touched.author?.dob && formik.errors.author?.dob ? (
                <div style={{ color: "red" }}>{formik.errors.author?.dob}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author Biography</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author biography"
                name="author.bio"
                onChange={formik.handleChange}
                value={formik.values.author.bio}
                onBlur={formik.handleBlur}
              />
              {formik.touched.author?.bio && formik.errors.author?.bio ? (
                <div style={{ color: "red" }}>{formik.errors.author?.bio}</div>
              ) : null}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
