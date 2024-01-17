import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../utils/ApiService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup';

function EditUser() {
  // let [name, setName] = useState("");
  // let [email, setEmail] = useState("");
  // let [batch, setBatch] = useState("");
  // let [mobile, setMobile] = useState("");
  let [initialValues, setValues] = useState({
    title: "",
    ISBNumber: "",
    publishedDate: "",
    author: {
      name: "",
      dob: "",
      bio: "",
    }
  });
  let { id } = useParams();
  let navigate = useNavigate();
  let getData = async () => {
    try {
      let res = await ApiService.get(`/bookauthor/${id}`);
      if (res.status === 200) {
        setValues({
          title: res.data.title,
          ISBNumber: res.data.ISBNumber,
          publishedDate: res.data.publishedDate,
          author: {
            name: res.data.author.name,
            dob: res.data.author.dob,
            bio: res.data.author.bio,
          },
        });
        // setName(res.data.name);
        // setMobile(res.data.mobile);
        // setBatch(res.data.batch);
        // setEmail(res.data.email);
      }
    } catch (error) {}
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title:   Yup.string().required('title is Required').max(75, 'Not exceed more than 75 characters').min(3, 'Atleast 3 characters'),
      ISBNumber:  Yup.string().required('Number is Required'),
      publishedDate: Yup.date().required('Date is Required').max(new Date()),
      author: Yup.object({
        name: Yup.string().required('Author name is required').max(30, 'Not exceed more than 30 characters').min(3, 'Atleast 3 characters'),
        dob:Yup.date().required('Author DOB is required'),
        bio:Yup.string().required('Author Bio is required').max(250, 'Not exceed more than 50 characters').min(15, 'Atleast 15 characters'),
      })
    }),
    enableReinitialize: true, //to reinitialize or reload the form to change then values
    onSubmit: async (values) => {
      values.id = id;
      try {
        let res = await ApiService.put(`/bookauthor/${id}`, values);
        if (res.status === 200) {
          navigate("/dashboard");
        }
      } catch (error) {}
    },
  });
  // let handleEdit = async () => {
  //   try {
  //     let res = await ApiService.put(`/users/${id}`, {
  //       id,
  //       name,
  //       email,
  //       batch,
  //       mobile,
  //     });
  //     if (res.status === 200) {
  //       // toast.success("User Updated Successfully")
  //       navigate("/dashboard");
  //     }
  //   } catch (error) {}
  // };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Edit Book and Author details</h1>
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

export default EditUser;
