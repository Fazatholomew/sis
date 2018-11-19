import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'containers/App/actions/auth';
import { navigateto } from 'containers/App/actions/router';

function mapStateToProps(state) {
  return {
        isAuthenticated: state.auth.isAuthenticated,
        id: state.auth.userInfo.id,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, navigateto }, dispatch);
}


export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.checkAuth();
            this.setState({loaded_if_needed: false,});
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (!props.isAuthenticated) {
                const token = localStorage.getItem('token');
                    if (!token) {
                        this.props.navigateto('/register');
                    } else {
                        this.props.check_token();
                        if (this.props.isAuthenticated) {
                            this.setState({loaded_if_needed: true})
                        } else {
                            this.props.navigateto('/register');
                        }
                    }
            } else {
                this.props.get_user(this.props.id)
                this.props.navigateto('/home')
                this.setState({loaded_if_needed: true,});
            }
        }

        render(){
            return(
                this.props.isAuthenticated && this.state.loaded_if_needed
                    ? <Component {...this.props} /> : null);

        }
    }


    AuthenticatedComponent.propTypes = {
        isAuthenticated: PropTypes.bool,
    };

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
