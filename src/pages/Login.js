import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Grid, Typography, Box, Card, FormControl, InputLabel, Input, Button, CircularProgress} from '@material-ui/core'
import {connect} from 'react-redux'

import {login} from '../redux/actions/auth'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      isBtnDisabled: true,
      isLoginOnProgress: false,
      isError: false,
      errorMsg: '',
      email: '',
      password: '',
      oldForm: {
        email: '',
        password: ''
      }
    }
    this.submitBtn = React.createRef()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value,
      isError: false,
      errorMsg: ''
    })
  }

  changeBtnState = () => {
    const {email, password, oldForm} = this.state
    if(email!=='' && password !==''){
      if(email!==oldForm.email || password!==oldForm.password){
        this.setState({isBtnDisabled: false})
      } else {
        this.setState({isBtnDisabled: true})
      }
    } else {
      this.setState({isBtnDisabled: true})
    }
  }

  selectText = (e) => {
    if(e){
      e.target.select()
    }
  }

  onLogin = (e) => {

    e.preventDefault()
    const {email, password} = this.state

    this.props.login(email, password)

    // this.submitBtn.current.focus()
    // this.setState({
    //   isBtnDisabled: true,
    //   isLoginOnProgress: true,
    //   isError: false,
    //   errorMsg: '',
    //   oldForm: {
    //     email,
    //     password
    //   }
    // })

    // setTimeout(() => {
    //   this.setState({
    //     isBtnDisabled: true,
    //     isLoginOnProgress: false,
    //     isError: true,
    //     errorMsg: 'Wrong Username or Password!'
    //   })
    // }, 3000)
  }

  componentDidUpdate(){
    if(this.props.auth.token!==null){
      this.props.history.push('/')
    }
  }

  render() {
    const {isLoading, isError, errorMsg} = this.props.auth
    // const {isBtnDisabled} = this.state
    return (
      <Box width='100%' height='100%' display='flex' justifyContent='center' alignItems='center'>
        <Grid md={4} sm={8} xs={11} item>
          <Card style={{padding: 50}} elevation={3}>
            <Typography align='center' variant='h5' component='h1'>Login System</Typography>
            <Typography align='center' color='error' component='h3'>
              {!isError&&<>&nbsp;</>}
              {isError&&errorMsg}
            </Typography>
            <form onSubmit={this.onLogin}>
              <FormControl fullWidth style={{marginTop:10}}>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <Input onFocus={this.selectText} disabled={isLoading} error={isError} onChange={this.handleChange} onKeyDown={this.changeBtnState} onKeyUp={this.changeBtnState} onKeyPress={this.changeBtnState} id='email' name='email' type='email' autoComplete='off'/>
              </FormControl>
              <FormControl fullWidth style={{marginTop:10}}>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input onFocus={this.selectText} disabled={isLoading} error={isError} onChange={this.handleChange} onKeyDown={this.changeBtnState} onKeyUp={this.changeBtnState} onKeyPress={this.changeBtnState} id='password' name='password' type='password' autoComplete='off'/>
              </FormControl>
              <FormControl fullWidth style={{marginTop:20}}>
                <Button ref={this.submitBtn} type='submit' onClick={this.onLogin} disabled={isLoading} color='primary' variant='contained'>
                  {isLoading && <CircularProgress size={24}/>}
                  {!isLoading && 'Login'}
                </Button>
              </FormControl>
            </form>
            <Typography style={{marginTop:20}} align='center'>
              <span>Don't have an account? <Link to='/register'>Register</Link></span>
            </Typography>
          </Card>
        </Grid>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {login}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
