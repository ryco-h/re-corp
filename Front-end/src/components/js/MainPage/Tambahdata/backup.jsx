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
    alias: ''
  })

  let [nasabah, setNasabah] = useState({
    no_regis: '',
    tanggal: '',
    nama_nasabah: '',
    pinjaman_ke: '',
    kasbon: '',
    storting: '',
    adm: '',
    drop_an: '',
    tabungan_in_out: '',
    bbm: '',
    service: '',
    tunai: ''
  })

  let handleChange = (e) => {
    let nama_nasabah = e.target.nama_nasabah;
    let value = e.target.value;
    nasabah[nama_nasabah] = value;
    setNasabah(nasabah)
    console.log(nasabah)
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

  let onSubmitNasabah = (e) => {
    e.preventDefault()

    axios.post("http://localhost:8000/nasabah/", nasabah)
    .then(response => {
        console.log(response);
        console.log(nasabah);
      })
      .then(setisSubmitted(isSubmitted=true))
      .catch(err => {
        console.log(nasabah);
        console.log(err, 'Failed to add, try again!');
      })
  }

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const classes = useStyles();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
  
  if (isSubmitted === true) {
    return <Redirect to= {{ pathname:'/'}}/>
  }

  return (
    <React.Fragment>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
        <Card className={classes.root}>
            <CardContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        className={classes.root2}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="tanggal"
                        label="Pilih tanggal"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                </MuiPickersUtilsProvider>
                <TextField onChange={handleChange} className={classes.root2} id="no_regis" variant="outlined" label="No. Registrasi"/>
                <TextField onChange={handleChange} className={classes.root2} id="nama_nasabah" variant="outlined" label="Nama Nasabah" />
                <TextField onChange={handleChange} className={classes.root2} id="pinjaman_ke" variant="outlined" label="Pinjaman Ke-" />
                <TextField onChange={handleChange} className={classes.root2} id="kasbon" variant="outlined" label="Kasbon" />
                <TextField onChange={handleChange} className={classes.root2} id="storting" variant="outlined" label="Storting" />
                <TextField onChange={handleChange} className={classes.root2} id="adm" variant="outlined" label="ADM" />
                <TextField onChange={handleChange} className={classes.root2} id="drop_an" variant="outlined" label="Drop-an" />
                <TextField onChange={handleChange} className={classes.root2} id="tabungan_in_out" variant="outlined" label="Tabungan masuk/keluar" />
                <TextField onChange={handleChange} className={classes.root2} id="bbm" variant="outlined" label="BBM" />
                <TextField onChange={handleChange} className={classes.root2} id="service" variant="outlined" label="Service" />
                <TextField onChange={handleChange} className={classes.root2} id="tunai" variant="outlined" label="Tunai"/>

                <Button variant="contained" type="submit" color="primary">Submit</Button>

            </CardContent>
        </Card>
    </form>
    </React.Fragment>
  );
}
