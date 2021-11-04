import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Portfolio from './Portfolio';
import SignUp from './SignUp';
import Nav from './Nav';



function LoginForm() {

  var history = useHistory()


  const [details, setDetails] = useState({email:'', password:''});
  const [error, setError] = useState('');

  const adminUser = {
    email : 'jt@jt',
    password: 'jt',
    name: 'Jamie'
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details)
  }

  const Login = (details) => {
    console.log(details);
    console.log(history);

    if (details.email === adminUser.email && details.password === adminUser.password) {
      // setUser({admin: true })
      // document.getElementById('email')
      // return (<Redirect to='/profile'/>)
      history.push('/portfolio')


    } else {
      setError('Invalid Credentials')
    }
  }

    // componentDidMount() {
    //     if (this.props.errors.length > 0) {
    //         this.props.clearErrors();
    //     }
    //     if (this.props.demoUser) {
    //         this.props.demoStateOff( {demoUser: false} );
    //         this.displayDemoUser('guest', 0);
    //     }
    // }

    // componentDidUpdate() {
    //     if (this.props.demoUser) {
    //         this.props.demoStateOff({ demoUser: false });
    //         this.displayDemoUser('guest', 0);
    //     }
    // }

    // update(field) {
    //     return e => {
    //         this.setState({
    //             [field]: e.currentTarget.value
    //         })
    //     }
    // }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     // const user = Object.assign({}, this.state);
    //     // this.props.processForm(user);
    //     useHistory().push('/profile')

    // }

    // renderErrors() {
    //     if (this.props.errors.length > 0) {
    //         return (
    //             <ul className='login-errors'>
    //                 {this.props.errors.map((error, i) => (
    //                     <li key={`error-${i}`}>
    //                         {error}
    //                     </li>
    //                 ))}
    //             </ul>
    //         );
    //     }
    // }

    // displayDemoUser(username, n) {
    //     if (n < username.length) {
    //         let curr = username.substring(0, n + 1);
    //         this.setState({ username: curr });
    //         n++;
    //         setTimeout( () => { this.displayDemoUser(username, n) }, 100);
    //     } else {
    //         this.displayDemoPassword('password', 0);
    //     }
    // }

    // displayDemoPassword(password, n) {
    //     if (n < password.length) {
    //         let curr = password.substring(0, n + 1);
    //         this.setState({ password: curr });
    //         n++;
    //         setTimeout(() => { this.displayDemoPassword(password, n) }, 100);
    //     } else {
    //         const demoUser = { username: 'guest', password: 'password' };
    //         this.props.processForm(demoUser);
    //     }
    // }

        // const { formType, navLink } = this.props;
        // const formLabel = formType[0].toUpperCase() + formType.slice(1).toLowerCase();
        // const navLinkLabel = navLink[0].toUpperCase() + navLink.slice(1).toLowerCase();
        return (
          <>
          <div> <Nav/> </div>
            <div className='session-form-div'>
                <form className='transparent-background'
                onSubmit={submitHandler}
                >
                    <h1 className='login-form-h1'>Welcome to Robinwood</h1>
                    <div className='session-inputs-div'>
                        <label className='login-label'>Email</label>
                        <input
                            className='session-input'
                            // onChange={this.update('username')}
                            // value={this.state.username}
                            required
                            type='email' name='name' id='name' onChange={e => setDetails({...details, email: e.target.value})} value = {details.email}
                            value={details.email}
                        />
                        <label className='login-label'>Password</label>
                        <input
                            className='session-input'
                            type="password"
                            // onChange={this.update('password')}
                            // value={this.state.password}
                            required
                            type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})}
                            value={details.password}
                            />

                        <p className='session-link-p'>
                            New to The Benevolent? <Link className='session-nav-link' to={`/signup`}>
                                {SignUp} Click here to complete your application
                                            </Link>
                        </p>
                        <button className='session-button' type="submit">Login</button>
                        {(error !== '') ? ( <div className='login-errors'>{error}</div>) : ''}

                    </div>
                </form>
            </div>
            </>

        )

}

export default LoginForm;