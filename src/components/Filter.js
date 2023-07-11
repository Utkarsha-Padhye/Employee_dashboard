import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";  
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';


export class Filter extends Component {
  state = {
    tableData: [],
    sortColumn: '',
    sortDirection: 'asc',
     searchQuery: ''
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  

  componentDidMount() {
    this.fetchTableData();
  }

  fetchTableData = () => {
    axios.get('api/employees')
      .then(response => {
        this.setState({ tableData: response.data });
      })
      .catch(error => {
        console.error('Error fetching table data:', error);
      });
  };

  sortTable = (column) => {
    const { tableData, sortColumn, sortDirection } = this.state;

    // Determine the new sort direction
    let newSortDirection = '↑' ;
    if (sortColumn === column) {
      newSortDirection = sortDirection === '↑' ? <span className='arrred'>↓</span> : '↑';
    }

    // Sort the table data based on the column and direction
    const sortedData = [...tableData].sort((a, b) => {
      if (a[column] < b[column]) {
        return newSortDirection === '↑' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return newSortDirection === '↑' ? 1 : -1;
      }
      return 0;
    });

    this.setState({
      tableData: sortedData,
      sortColumn: column,
      sortDirection: newSortDirection
    });
  };

  render() {
    const { tableData, sortColumn, sortDirection, searchQuery } = this.state;

    const filteredData = tableData.filter(row => {
      const values = Object.values(row).join(' ').toLowerCase();
      return values.includes(searchQuery.toLowerCase());
    });

    const csvData = Papa.unparse(filteredData);


    return (
      <div class = 'filter-image'>
        <h1 className='text-center mt-4'>Employee Database</h1>
        <div class = 'centre1'>
        <input type="text" value={searchQuery} onChange={this.handleSearchChange} placeholder="Search" />
        </div>
      <Container>
      <div>
      <CSVLink className="downloadbtn" data={csvData} filename="filteredData.csv">Export to CSV</CSVLink>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th onClick={() => this.sortTable('employeeId')} >
            Employee ID {sortColumn === 'employeeId' && <span className="arrowcol"> {sortDirection} </span>}
            </th>
            <th onClick={() => this.sortTable('firstName')}>
              First Name {sortColumn === 'firstName' && <span className="arrowcol"> {sortDirection}</span>}
            </th>
            <th onClick={() => this.sortTable('lastName')}>
              Last Name {sortColumn === 'lastName' && <span className="arrowcol"> {sortDirection}</span>}
            </th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th onClick={() => this.sortTable('salary')}>
              Salary {sortColumn === 'salary' && <span className="arrowcol"> {sortDirection}</span>}
              </th>
            {/* Add more column headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.employeeId}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.department}</td>
              <td>{row.position}</td>
              <td>${row.salary}</td>
              {/* Render more table cells based on your data */}
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>
      </div>
    );
  }
}
