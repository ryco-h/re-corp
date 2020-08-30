import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Card, Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root2: {
    width: '40ch',
    margin: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '25ch',
      minWidth: 750,
    },
  bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
  title: {
        fontSize: 14,
      },
  pos: {
        marginBottom: 12,
      },
  },
}));


export default function BasicTextFields() {

  let [ isSubmitted, setisSubmitted] = useState({
    isSubmitted: false
  });

  let [heroes, setHeroes] = useState({
    name: '',
    alias: '',
    nama_nasabah: ''
  })

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    heroes[name] = value;
    setHeroes(heroes)
    console.log(heroes)
  }

  let onSubmit = (e) => {
    e.preventDefault()

    axios.post("http://localhost:8000/heroes/", heroes)
    .then(response => {
        console.log(response);
        console.log(heroes);
      })
      .then(setisSubmitted(isSubmitted=true))
      .catch(err => {
        console.log(heroes);
        console.log(err, 'Failed to add, try again!');
      })
      .then(document.location.reload());
  }

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const classes = useStyles();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
  
  if (isSubmitted === true) {
    return <Redirect to= {{ pathname:'/tambahdata/'}}/>
  }

  return (
    <React.Fragment>
    <form className={classes.root} noValidate autoComplete="off">
        <Card className={classes.root}>
            <CardContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        className={classes.root2}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Pilih tanggal"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                </MuiPickersUtilsProvider>
                <TextField className={classes.root2} label="" disabled/>
                <TextField className={classes.root2} onChange={handleChange} id="outlined-basic" variant="outlined" name="nama_nasabah" label="Nama Nasabah" />
                <TextField className={classes.root2} id="outlined-basic" variant="outlined" label="Pinjaman Ke-" />
                <TextField className={classes.root2} id="outlined-basic" variant="outlined" label="Kasbon" />
                <TextField className={classes.root2} id="outlined-basic" variant="outlined" label="Storting" />
                <TextField className={classes.root2} id="outlined-basic" variant="outlined" label="ADM" />
                <TextField className={classes.root2} id="outlined-basic" variant="outlined" label="Drop-an" />
                <TextField className={classes.root2} id="outlined-basic" variant="outlined" label="Tabungan masuk/keluar" />
                <TextField className={classes.root2} id="outlined-basic" variant="outlined" label="BBM" />
                <TextField className={classes.root2} id="outlined-basic" variant="outlined" label="Service" />
                <TextField className={classes.root2} id="outlined-basic" variant="outlined" label="Tunai"/>

                <Button variant="contained" type="submit" color="primary">Submit</Button>

            </CardContent>
        </Card>
    </form>
    
    <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
      <Card className={classes.root}>
          <CardContent>
            <TextField onChange={handleChange} className={classes.root2} name="name" id="name" variant="outlined" label="Name"  />
            <TextField onChange={handleChange} className={classes.root2} name="alias" id="alias" variant="outlined" label="Alias" />

            <Button variant="contained" type="submit" color="primary">Submit</Button>
          </CardContent>
      </Card>
    </form>

    </React.Fragment>
  );
}
