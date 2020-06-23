import React, {Component} from 'react'
import {Box, Typography, Button, CircularProgress} from '@material-ui/core'
import {connect} from 'react-redux'
import jwt from 'jsonwebtoken'

import {createUser} from '../redux/actions/users'

class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: jwt.decode(this.props.auth.token) || {
        email: ''
      }
    }
  }
  componentWillMount(){
    if(this.props.auth.token === null){
      this.props.history.push('/login')
    }
  }
  createUser = ()=>{
    this.props.createUser({
      fullName: 'Admin',
      email: 'admin@arkademy.com',
      password: 123
    }, this.props.auth.token)
  }
  render(){
    const {isLoading, successMsg, errorMsg} = this.props.users
    return(
      <>
        <Box width='100%' height='100%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <Typography variant='h4' component='h1'>
            Welcome {this.state.user.email}
          </Typography>
          <div>
          <Typography variant='h5' component='h2'>
            {errorMsg}
            {successMsg}
          </Typography>
          </div>
          <div>
            <Button variant='contained' color='primary' disabled={isLoading} onClick={this.createUser}>
              {isLoading && <CircularProgress />}
              {!isLoading && 'Create User'}
            </Button>
          </div>
        </Box>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users
})

const mapDispatchToProps = {createUser}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
