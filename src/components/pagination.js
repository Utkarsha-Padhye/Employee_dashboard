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


export class Pagination extends Component {
  constructor(props) {
  super(props);
    this.state = {
     data: [],
     sortColumn: '',
      sortDirection: 'asc',
      searchQuery: '',
      currentPage: 1,
      totalPages: 1,
      limit: 5,
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  

  componentDidMount() {
    this.fetchdata();
  }

  fetchdata = () => {
    const { currentPage, limit } = this.state;
    axios.get(`https://api.instantwebtools.net/v1/passenger?page=${currentPage}&size=${limit}`)
      .then(response => {
        const { totalPassengers, totalPages, data } = response.data;
        this.setState({
          totalPassengers,
          totalPages,
          data,
          });
          console.log(data)
      })
      .catch(error => {
        console.error('Error fetching table data:', error);
      });
  };

  sortTable = (column) => {
    const { data, sortColumn, sortDirection } = this.state;

    // Determine the new sort direction
    let newSortDirection = '↑' ;
    if (sortColumn === column) {
      newSortDirection = sortDirection === '↑' ? <span className='arrred'>↓</span> : '↑';
    }

    // Sort the table data based on the column and direction
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) {
        return newSortDirection === '↑' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return newSortDirection === '↑' ? 1 : -1;
      }
      return 0;
    });

    this.setState({
      data: sortedData,
      sortColumn: column,
      sortDirection: newSortDirection
    });
  };

  goToPage = page => {
    this.setState({ currentPage: page }, () => {
      this.fetchdata();
    });
  };

  render() {
    const { data, sortColumn, sortDirection, searchQuery, currentPage, totalPages } = this.state;

    const filteredData = data.filter(row => {
      const values = Object.values(row).join(' ').toLowerCase();
      return values.includes(searchQuery.toLowerCase());
    });

    const csvData = Papa.unparse(filteredData);


    return (
      <div className = 'filter-image'>
        <h1 className='text-center mt-4'>Employee Database</h1>
        <div className = 'centre1'>
        <input type="text" value={searchQuery} onChange={this.handleSearchChange} placeholder="Search" />
        </div>
      <Container>
      <div>
      <CSVLink className="downloadbtn" data={csvData} filename="filteredData.csv">Export to CSV</CSVLink>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th onClick={() => this.sortTable('id')} >
            Employee ID {sortColumn === 'id' && <span className="arrowcol"> {sortDirection} </span>}
            </th>
            <th onClick={() => this.sortTable('name')}>
              First Name {sortColumn === 'name' && <span className="arrowcol"> {sortDirection}</span>}
            </th>
            {/* <th onClick={() => this.sortTable('lastName')}>
              Last Name {sortColumn === 'lastName' && <span className="arrowcol"> {sortDirection}</span>}
            </th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th onClick={() => this.sortTable('salary')}>
              Salary {sortColumn === 'salary' && <span className="arrowcol"> {sortDirection}</span>}
              </th> */}
            {/* Add more column headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.trips}</td>
              <td>{row.name}</td>
              {/* <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.department}</td>
              <td>{row.position}</td>
              <td>${row.salary}</td> */}
              {/* Render more table cells based on your data */}
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>
      {/* Render pagination */}
      <div>
          {currentPage > 1 && (
            <button onClick={() => this.goToPage(currentPage - 1)}>Previous</button>
          )}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
            <button
              key={page}
              onClick={() => this.goToPage(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages && (
            <button onClick={() => this.goToPage(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
    );
  }
}
