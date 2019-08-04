import React from 'react';
import '../../styles/main.scss';
import CSVReader from 'react-csv-reader';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIssue: [],
      bodyData: [],
      sort: false,
    }
  }

  sortAsc = () => {
    const { bodyData } = this.state;

    const sortedData = bodyData.sort(function(a, b) {
      return a[1] < b[1] ? 1 : -1
    })

    this.setState({
      bodyData: sortedData,
      sort: true,  
    })
  }

  sortDesc = () => {
    const { bodyData } = this.state;

    const sortedData = bodyData.sort(function(a, b) {
      return a[1] < b[1] ? -1 : 1
    })

    this.setState({
      bodyData: sortedData,
      sort: false,  
    })
  }


  handleCSV = data => {
    this.setState({
      dataIssue: data,
      bodyData: data.slice(1).sort(function(a, b) {
        return a[1] < b[1] ? -1 : 1;
      })
    })
  }

  renderTableHead = () => {
    if(this.state.dataIssue[0] !== undefined) {
      var row = this.state.dataIssue[0].map(cell => <th onClick={() => this.state.sort ? this.sortDesc() : this.sortAsc()}>{cell}</th>);
      return <tr>{row}</tr>
    }
  }

  renderTableBody = () => {
    if(this.state.bodyData !== undefined) {
      return this.state.bodyData.map(rows => {
        var row = rows.map(cell => <td>{cell}</td>);
        return <tr>{row}</tr>
      })
    }
  }
  
  render() {
    return (
      <div className="App">
        <h1>CSV Table</h1>

        <CSVReader
          cssClass="csv-reader-input"
          onFileLoaded={this.handleCSV}
        />

        <table id="issues">
          <thead>
            {this.renderTableHead()}
          </thead>
          <tbody>
            {this.renderTableBody()}
          </tbody>
        </table>
        
      </div>
    )
  }
}