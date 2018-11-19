/**
 *
 * PostButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Arrow from '@material-ui/icons/ArrowRightAlt';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

const colors = {
  0: ['#9C27B0', '#4A148C'],
  2: ['#C62828', '#B71C1C'],
  3: ['#0097A7', '#006064'],
  4: ['#E91E63', '#880E4F'],
  5: ['#00897B', '#004D40'],
  6: ['#FF8F00', '#FF6F00'],
  7: ['#EF6C00', '#E65100'],
  8: ['#6D4C41', '#3E2723'],
  9: ['#3949AB', '#1A237E'],
  1: ['#512DA8', '#311B92'],
  10: ['#039BE5', '#01579B']
};

const keys = Object.keys(colors);
let colorObjects = {}
for (let color in keys){
  colorObjects[color] = {
    background: colors[color][0],
    color: 'white',
    margin: 5,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    textTransform: 'none',
    fontSize: 18,
    '&:hover': {
      backgroundColor: colors[color][1],
    }
  }
}


const styles = theme => ({
  ...colorObjects,
  content: {
    margin: 5,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    textTransform: 'none',
  },
  typo: {
    margin: 0,
    padding: 0,
  },
  time: {
    marginRight: 10,
    marginLeft: 5,
  },
  passenger: {
    marginRight: 10,
  },
});

const timeToString = (time) => {
	const unix_time = Date.parse(time);
	const convertedTime = new Date(unix_time);
	const hour = convertedTime.getHours() > 12 ? convertedTime.getHours() - 12 : convertedTime.getHours() || '12';
	const minute = convertedTime.getMinutes() < 10 ? `0${convertedTime.getMinutes()}` : convertedTime.getMinutes()
	const ampm = convertedTime.getHours() >= 12 ? 'PM' : 'AM'
	return (`${hour}:${minute} ${ampm}`);
}

const renderPassenger = (passenger, style, data) => {
  if(passenger){
    return (<div className={style}>
      {data.passengers.length}<b>/</b>{data.passenger}
    </div>)
  }else{
    return null
  }
}

function PostButton(props) {
  const { classes, clickEvent, data, entry_id, checked, delay} = props;
  return (
    <Slide direction="right" in={checked} style={{ transitionDelay: delay}} mountOnEnter>
      <Button
        variant="contained"
        fullwidth="true"
        className={classes[`${data.color}`]}
        onClick={e => props.clickEvent(data, entry_id, e)}
      >
        <Grid container direction="row" justify="center">
          <Grid item xs className={classes.typo}>
            {data.asal.substring(0, 17)}
          </Grid>
          <Arrow />
          <Grid item xs className={classes.typo}>
            {data.tujuan.substring(0, 17)}
          </Grid>
          <div className={classes.time}>{timeToString(data.time)}</div>
          {renderPassenger(data.passenger, classes.passenger, data)}
        </Grid>
      </Button>
    </Slide>
  );
}

PostButton.propTypes = {};

export default withStyles(styles)(PostButton);
