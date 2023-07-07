import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
//import { data } from './data.js';

export const  Filter = ()=> {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
 // const baseurl = 'http://localhost:8080/';

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('api/employees', {
        headers : {
          "Content-Type": "application/json",
        },
        method : 'GET',
      })
      setData(res.data);
      // const data1 =  JSON.stringify(data);
      // console.log(data1);
    };
    if (search.length === 0 || search.length > 2) fetchData();
  }, [search]);

  return (
    <div>
      <Container>
        <h1 className='text-center mt-4'>Employee Dashboard</h1>
        <Form>
          <InputGroup className='my-3'>

            {/* onChange for search */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Employee'
            />
          </InputGroup>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
          
              <th>Salary</th>
             
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  {/* <td>{item.email}</td>
                  <td>{item.salary}</td> */}
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
