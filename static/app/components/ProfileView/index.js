/**
 *
 * ProfileView
 *
 */

import React from "react";
// import PropTypes from 'prop-types';

import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2
  }
});

function ProfileView({ data, anchorEl, handleClose, classes, open}) {
  let initials = "";
  if(data.name){
    const names = data.name.split(" ");
	  initials = names[0].charAt(0).toUpperCase()
    if(names.length > 1){initials += names[1].charAt(0).toUpperCase()}
  }
  return (
    <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Grid container direction="column" className={classes.avatar}>
            <Typography className={classes.typography}>{data.name}</Typography>
            <Typography className={classes.typography}><a href={`mailto:${data.email}`}><i>{data.email}</i></a></Typography>
            
          </Grid>
        </Popover>
  )
}

ProfileView.propTypes = {};

export default withStyles(styles)(ProfileView);
