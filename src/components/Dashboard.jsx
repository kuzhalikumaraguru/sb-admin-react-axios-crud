import React, { useEffect, useState } from "react";
import Card from './Card';
import Button from "react-bootstrap/Button";
import Table  from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import ApiService from "../utils/ApiService";
import { toast } from "react-toastify";
function Dashboard() {
  let [user, setUser] = useState([]);
  let navigate = useNavigate();
  //  let data = [
  //    {
  //      title: "EARNINGS (MONTHLY)",
  //      value: "$45,000",
  //      color: "primary",
  //      icon: "fa-calendar",
  //      isProgress: false,
  //    },
  //    {
  //      title: "EARNINGS (ANNUAL)",
  //      value: "$215,000",
  //      color: "success",
  //      icon: "fa-dollar-sign",
  //      isProgress: false,
  //    },
  //    {
  //      title: "TASKS",
  //      value: "20",
  //      color: "info",
  //      icon: "fa-clipboard-list",
  //      isProgress: true,
  //    },
  //    {
  //      title: "PENDING REQUEST",
  //      value: "18",
  //      color: "warning",
  //      icon: "fa-comments",
  //      isProgress: false,
  //    },
  //  ];
  let getData = async () => {
    try {
    let res = await ApiService.get("/bookauthor");
      if (res.status === 200) {
        setUser(res.data);
        // toast.success('Data fetched successfully')
      }
    } catch (error) {
      
    }
  }
  let handleDelete = async(id) => {
    try {
      let res = await ApiService.delete(`/bookauthor/${id}`)
      if (res.status === 200) {
        getData();
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getData();
  },[])
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          </div>
          <div className="row">
            {/* {data.map((e, i) => {
              return <Card cardData={e} key={i} />;
            })} */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SL.No</th>
                  <th>Title</th>
                  <th>ISBN Number</th>
                  <th>Publication Date</th>
                </tr>
              </thead>
              <tbody>
                {user.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.title}</td>
                      <td>{e.ISBNumber}</td>
                      <td>{e.publishedDate}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => {
                            navigate(`/edit-book/${e.id}`);
                          }}
                        >
                          Edit
                        </Button>
                        &nbsp;
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleDelete(e.id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
<hr/>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SL.No</th>
                  <th>Author Name</th>
                  <th>Birth Date</th>
                  <th>Biography</th>
                </tr>
              </thead>
              <tbody>
                {user.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.author.name}</td>
                      <td>{e.author.dob}</td>
                      <td>{e.author.bio}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => {
                            navigate(`/edit-book/${e.id}`);
                          }}
                        >
                          Edit
                        </Button>
                        &nbsp;
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleDelete(e.id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
