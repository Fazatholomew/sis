/**
 *
 * MainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';


import RequestView from 'components/RequestView';
import CreateView from 'components/CreateView';
import PostButton from 'components/PostButton';

import {get_entries, post_offer, delete_offer, patch_join, post_request, delete_request} from 'containers/App/actions/entries'


const styles = theme => ({
  container: {
    margin: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  fullwidth: {
    width: '100vw',
  },
  button: {
    marginTop: 25,
    display: 'flex',
    justifyContent: 'center'
  }
});

/* eslint-disable react/prefer-stateless-function */
export class MainPage extends React.Component {
  state = { value: 0, currentData: {}, open: false, mode: false, create: false, entries: this.props.entries.offers, openRequest: false, checked: false, fromRequest:false};

  handleChange = (event, value) => {
    this.props.get_entries();
    this.setState({ value });
    if(this.state.value){
      this.setState({entries: this.props.entries.offers})
    }else{
      this.setState({entries: this.props.entries.requests})
    }
  };

  handleClose = () => {
    if(this.state.value){
      this.setState({ openRequest: false});
    }else{
      this.setState({ open: false});
    }
  };

  handleEntry = (data, id, e) => {
    const current_id = this.props.auth.userId
    const mode = data.user_id == current_id ? true : false;
    if(!this.state.value){
      this.setState({open: true})
    }else{
      this.setState({openRequest: true})
    }
    this.setState({ currentData: data, mode: mode, create: false, current_entry: id });
  };

  handleCreate = () => {
    if(!this.state.value){
      this.setState({open: true})
    }else{
      this.setState({openRequest: true})
    }
    this.setState({create: true, currentData: {}})
  }
  
  handleSubmit = (data) => {
    if(this.state.fromRequest){
      this.props.delete_request(this.state.current_entry)
    }
    let sendData = {...data};
    sendData['user_id'] = this.props.auth.userId;
    if(!this.state.value){
      this.props.post_offer(sendData);
    }else{
      this.props.post_request(sendData);
    }
	
  }

  handleDelete = (entry_id) => {
    if(!this.state.value){
      this.props.delete_offer(entry_id);
    }else{
      this.props.delete_request(entry_id);
    }
    
  }

  handleJoin = (entry_id) => {
    this.props.patch_join(entry_id, this.props.auth.userId);
  }

  create = (data, entry_id) => {
    this.setState({open: true, currentData: data, create: true, value: 0, fromRequest: true, current_entry: entry_id})
  }
  
  
  componentDidMount(){
    this.props.get_entries();
    this.setState({entries: this.props.entries.offers, checked:true})
  }
  
  componentDidUpdate(prevProps){
	//if(prevProps.entries != this.props.entries){
	//  this.props.get_entries();  
	//}
  }

  render() {
    const { value, open, currentData, create, openRequest} = this.state;
    const { classes} = this.props;
    const entries = value ? this.props.entries.requests : this.props.entries.offers;
	  const dataKeys = Object.keys(entries);
    const renderData = dataKeys.map((key, i) => (
      <PostButton clickEvent={this.handleEntry} entry_id={key} data={entries[key]} key={i} checked={this.state.checked} delay={(i + 1) * 40}/>
    ));
    return (
      <div className={classes.fullwidth}>
        <BottomNavigation value={value} onChange={this.handleChange} showLabels>
          <BottomNavigationAction label="Offers" />
          <BottomNavigationAction label="Requests" />
        </BottomNavigation>
        <div>
          <Grid container direction="column" justify="center">
            {renderData}
          </Grid>
        </div>
		    <CreateView
          open={open}
          handleClose={this.handleClose}
          handleSubmit={this.handleSubmit}
          delete={this.handleDelete}
          mode={this.props.auth.userProfile.id === currentData.user_id}
          create={create}
          data={currentData}
          current_id={this.props.auth.userProfile.id}
          entry_id={this.state.current_entry}
          join={this.handleJoin}
          users={this.props.entries.users}
          fromRequest={this.state.fromRequest}
        />
        <RequestView
          open={openRequest}
          handleClose={this.handleClose}
          handleSubmit={this.handleSubmit}
          delete={this.handleDelete}
          mode={this.props.auth.userProfile.id === currentData.user_id}
          create={create}
          data={currentData}
          current_id={this.props.auth.userProfile.id}
          entry_id={this.state.current_entry}
          handleCreate={this.create}
          users={this.props.entries.users}
        />
		    <div className={classes.button}><Button variant='fab' color='primary' onClick={this.handleCreate}><AddIcon/></Button></div>
      </div>
    );
  }
}

MainPage.propTypes = {
};

const mapStateToProps = state => ({
  auth: state.auth,
  entries: state.entries,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({get_entries, post_offer, delete_offer, patch_join, post_request, delete_request}, dispatch)
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(MainPage);
