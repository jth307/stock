class Auth {

  constructor() {
    this.authenticated= false
  }

  login(details, cb){
    console.log(details)
    this.authenticated= true
    cb()
  }

  logout(cb){
    console.log('u log out')

    this.authenticated= false
    cb()

  }

  isAuthenticated(){
    return this.authenticated
  }

}

export default new Auth()