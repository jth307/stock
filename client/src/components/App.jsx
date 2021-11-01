// import React from 'react';
// import Nav from './Nav';




// function App () {

//   return (

//     <div className='landing'>
//         <header>
//             <Nav />
//         </header>

//     </div>
// )
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';
import Landing from './Landing';
import LoginPage from './LoginPage';
import Portfolio from './portfolio';

const App = () => (
    <Router>
    <div className='main-div'>
        <header className = 'app-header'>
            <Nav />
        </header>
        <Route exact path='/portfolio' component={Portfolio} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/landing' component={Landing} />

        {/* <Route path='/stocks/:symbol' component={StockDetailsContainer} /> */}
    </div>
    </Router>
);

export default App;