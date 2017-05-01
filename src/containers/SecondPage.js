import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import { Link } from 'react-router-dom'
import './SecondPage.css'

class SecondPage extends Component {
  componentDidMount() {
    this.props.userActions.request(1)
  }
  render() {
    return (
      <div className='bold'>
        <h2>Second Page</h2>
        <Link to={'/'}>First</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondPage)
