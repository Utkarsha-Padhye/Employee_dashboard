import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import "../App.css";  
import { useTable } from 'react-table';
//import { data } from './data.js';

export const  Filter = ()=> {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const  sortDirection = 'asc';
  
 // const baseurl = 'http://localhost:8080/';
 

  useEffect(() => {
    const fetchData = async () => {
      // const res = await axios.get('api/employees', {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users', {
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

    const handleCellClick = (value) => {
      console.log('Cell clicked:', value);
      // Add your custom logic here
    };

    const sortTable = (columnName) => {
      const { tableData, sortDirection } = this.state;
    
      // Clone the table data array
      const sortedData = [...data];
    
      sortedData.sort((a, b) => {
        if (a[columnName] < b[columnName]) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[columnName] > b[columnName]) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    
      this.setState({
        tableData: sortedData,
        sortDirection: sortDirection === 'asc' ? 'desc' : 'asc'
      });
    };
    

    // sortTable = (columnName) => {
    //   const { data, sortDirection } = this.state;
    
      // Clone the table data array
      // const sortedData = [...data];
    
      // sortedData.sort((a, b) => {
      //   if (a[columnName] < b[columnName]) {
      //     return sortDirection === 'asc' ? -1 : 1;
      //   }
      //   if (a[columnName] > b[columnName]) {
      //     return sortDirection === 'asc' ? 1 : -1;
      //   }
      //   return 0;
      // });



  return (
    <div class = 'filter-image'>
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
        <Table striped bordered hover variant="dark">
          <thead >
            <tr>
              <th onClick={() => handleCellClick('First Name')}>First Name</th>
              <th onClick={() => this.sortTable('Last Name')}>Last Name</th>
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
                  <td onClick={() => handleCellClick(item.name)}>{item.name}</td>
                  <td>{item.username}</td>
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
