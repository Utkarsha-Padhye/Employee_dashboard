import React, { Component } from 'react';
import axios from 'axios';

class Table extends Component {
  state = {
    tableData: [],
    currentPage: 1,
    totalPages: 0
  };

  componentDidMount() {
    this.fetchTableData();
  }

  fetchTableData = (page = 1) => {
    axios.get(`/api/tableData?page=${page}`)
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
    const { tableData, currentPage, totalPages } = this.state;

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

export default Table;
