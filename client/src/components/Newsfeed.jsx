import React from 'react';
import Graph from './Graph';



class Newsfeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }


    render() {

        return(
          <div className='newsfeed'>
              <div className='newsfeed-container'>
                <div className='newsfeed-chart'>
                  <div className='newsfeed-portfolio'>
                    <h1>$524,031</h1>
                    <p>+$44.63 (+0.04%) Today</p>
                  </div>
                  <div className='newsfeed-chart'>
                    <Graph/>
                  </div>
                </div>
              </div>
          </div>

        )
    }
}

export default Newsfeed;
