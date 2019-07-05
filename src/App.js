import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      filterdItems: []
    };
    this.handleChange = this.handleChange.bind(this);

  }
  componentDidMount() {
    this.interval = setInterval(() => {this.getApiData()}, 30000);
    this.getApiData();
  }
  getApiData() {
    var self = this;
    self.setState({isLoaded:false});
    axios.get('https://api.wmata.com/TrainPositions/TrainPositions', {
      params: {
        contentType: 'json',
        api_key: '032baad2545c44358a71aa8e186151cd',
      }
    }).then(function (response) {
      if (response.data) {
        self.setState({
          isLoaded: true,
          items: response.data.TrainPositions,
          filterdItems: response.data.TrainPositions,
        });
      }
      console.log(response);
    }).catch(function (error) {
      self.setState({
        isLoaded: true,
        error
      });
      console.log(error);
    }).then(function () {
      self.setState({
        isLoaded: true,
      });
    });
  }
  handleChange(e) {
    let toFilter = this.state.items;
    let filterdItems = toFilter.filter(l => {
      if (l[e.target.name] != null && e.target.value !== '') {
        return l[e.target.name].toString().toLowerCase().match(e.target.value);
      }
      else if (e.target.value === '') {
        return l;
      } else {
        return '';
      }
    })
    this.setState({ filterdItems: filterdItems });
  }
  render() {
    const { error, isLoaded, filterdItems } = this.state;

    if (error) {
      return (
        <div className="container">
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>There is an error with api please try to refresh, Or contact to service administrator</p>
          </Alert>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="container text-center">
          <Spinner animation="border"></Spinner>
        </div>
      );
    } else {
      return (
        <div className="container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>TrainId</th>
                <th>TrainNumber</th>
                <th>CarCount</th>
                <th>DirectionNum</th>
                <th>CircuitId</th>
                <th>DestinationStationCode</th>
                <th>LineCode</th>
                <th>SecondsAtLocation</th>
                <th>ServiceType</th>
              </tr>
              <tr>
                <th>
                  <InputGroup>
                    <FormControl name="TrainId" onChange={this.handleChange} placeholder="TrainId" aria-label="TrainId" />
                  </InputGroup>
                </th>
                <th>
                  <InputGroup>
                    <FormControl name="TrainNumber" onChange={this.handleChange} placeholder="TrainNumber" aria-label="TrainNumber" />
                  </InputGroup>
                </th>
                <th>
                  <InputGroup>
                    <FormControl name="CarCount" onChange={this.handleChange} placeholder="CarCount" aria-label="CarCount" />
                  </InputGroup>
                </th>
                <th>
                  <InputGroup>
                    <FormControl name="DirectionNum" onChange={this.handleChange} placeholder="DirectionNum" aria-label="DirectionNum" />
                  </InputGroup>
                </th>
                <th>
                  <InputGroup>
                    <FormControl name="CircuitId" onChange={this.handleChange} placeholder="CircuitId" aria-label="CircuitId" />
                  </InputGroup>
                </th>
                <th>
                  <InputGroup>
                    <FormControl name="DestinationStationCode" onChange={this.handleChange} placeholder="DestinationStationCode" aria-label="DestinationStationCode" />
                  </InputGroup>
                </th>
                <th>
                  <InputGroup>
                    <FormControl name="LineCode" onChange={this.handleChange} placeholder="LineCode" aria-label="LineCode" />
                  </InputGroup>
                </th>
                <th>
                  <InputGroup>
                    <FormControl name="SecondsAtLocation" onChange={this.handleChange} placeholder="SecondsAtLocation" aria-label="SecondsAtLocation" />
                  </InputGroup>
                </th>
                <th>
                  <InputGroup>
                    <FormControl name="ServiceType" onChange={this.handleChange} placeholder="ServiceType" aria-label="ServiceType" />
                  </InputGroup>
                </th>
              </tr>
            </thead>
            <tbody>
              {filterdItems.map(item => (
                <tr key={item.TrainId}>
                  <td>{item.TrainId}</td>
                  <td>{item.TrainNumber}</td>
                  <td>{item.CarCount}</td>
                  <td>{item.DirectionNum}</td>
                  <td>{item.CircuitId}</td>
                  <td>{item.DestinationStationCode}</td>
                  <td>{item.LineCode}</td>
                  <td>{item.SecondsAtLocation}</td>
                  <td>{item.ServiceType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

export default App;
