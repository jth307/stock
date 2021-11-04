import React from 'react';
import Graph from './Graph';
import Timeline from './Timeline';
import Odometer from 'react-odometerjs';


class Newsfeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          odometerValue: 0

        }

    }

    componentDidMount() {
      this.setState({ odometerValue: 128532.98 });
  }


    render() {

        return(
          <div className='newsfeed'>
              <div className='newsfeed-container'>
                <div className='newsfeed-chartSection'>
                  <div className='newsfeed-portfolio'>
                    <h2>Balance</h2>
                    <h1> $<Odometer
                    format="(,ddd).dd"
                    duration={ 500 }
                    value={ this.state.odometerValue }
                />
                </h1>
                    <p>+$44.63 (+0.04%) Today</p>
                  </div>
                  <div >
                    <Graph/>
                  </div>
                </div>
              </div>
          </div>

        )
    }
}

export default Newsfeed;
