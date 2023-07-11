import React, { Component } from 'react';
import axios from 'axios';

export class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 1,
      totalPages: 1,
      limit: 10,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { currentPage, limit } = this.state;
    
    axios
      .get(`https://api.instantwebtools.net/v1/passenger?page=${currentPage}&size=${limit}`)
      .then(response => {
        const { totalPassengers, totalPages, data } = response.data.results;
        this.setState({
        totalPassengers,
        totalPages,
        data,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  goToPage = page => {
    this.setState({ currentPage: page }, () => {
      this.fetchData();
    });
  };

  render() {
    const { data, currentPage, totalPages } = this.state;

    return (
      <div>
        {/* Render data */}
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>

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


