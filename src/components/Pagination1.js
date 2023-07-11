import React, { Component } from 'react';
import axios from 'axios';

export class Pagination extends Component {
  state = {
    tableData: [],
    currentPage: 1,
    totalPages: 0,
    limitpage:2
  };

  componentDidMount() {
    this.fetchTableData();
  }

  fetchTableData = (page = 1) => {
    axios.get(`https://jsonplaceholder.typicode.com/users?page=${page}`)
      .then(response => {
        this.setState({
          tableData: response.data.results,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages
        });
      })
      .catch(error => {
        console.error('Error fetching table data:', error);
      });
  };

  handlePageChange = (page) => {
    this.fetchTableData(page);
  };

  render() {
    const { tableData, currentPage, totalPages, limitpages } = this.state;

    return (
      <div>
        <table>
          <thead>
            {/* Table headers */}
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {/* Table cells */}
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}


