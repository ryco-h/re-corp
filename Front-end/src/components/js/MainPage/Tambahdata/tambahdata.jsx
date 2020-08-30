import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Card, Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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

  let [dateNow, setDatenow] = useState(new Date())

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    nasabah[name] = value;
    setNasabah(nasabah)
    console.log(nasabah)
  }

  let onSubmitNasabah = (e) => {
    e.preventDefault()

    axios.post("https://rockyryco0.pythonanywhere.com/auth/nasabah/", nasabah)
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
  let [nasabah, setNasabah] = useState({
    no_regis: '',
    tanggal: selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getDate(),
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
  const classes = useStyles();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDatenow(nasabah['tanggal']=date.getFullYear() + '-' +  (date.getMonth() + 1)  + '-' +  date.getDate())
    console.log(dateNow)
    console.log(selectedDate)
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  if (isSubmitted === true) {
    return <Redirect to="/"/>
  }
  
  return (
    <React.Fragment>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmitNasabah}>
        <Card className={classes.root} fullScreen={fullScreen}>
            <CardHeader title="Masukkan Data Nasabah"/>
            <CardContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        className={classes.root2}
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="tanggal"
                        name="tanggal"
                        label="Pilih tanggal"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                </MuiPickersUtilsProvider>
                <TextField onChange={handleChange} className={classes.root2} name="no_regis" id="no_regis" variant="outlined" label="No. Registrasi"/>
                <TextField onChange={handleChange} className={classes.root2} name="nama_nasabah" id="nama_nasabah" variant="outlined" label="Nama Nasabah" />
                <TextField onChange={handleChange} className={classes.root2} name="pinjaman_ke" id="pinjaman_ke" variant="outlined" label="Pinjaman Ke-" />
                <TextField onChange={handleChange} className={classes.root2} name="kasbon" id="kasbon" variant="outlined" label="Kasbon" />
                <TextField onChange={handleChange} className={classes.root2} name="storting" id="storting" variant="outlined" label="Storting" />
                <TextField onChange={handleChange} className={classes.root2} name="adm" id="adm" variant="outlined" label="ADM" />
                <TextField onChange={handleChange} className={classes.root2} name="drop_an" id="drop_an" variant="outlined" label="Drop-an" />
                <TextField onChange={handleChange} className={classes.root2} name="tabungan_in_out" id="tabungan_in_out" variant="outlined" label="Tabungan masuk/keluar" />
                <TextField onChange={handleChange} className={classes.root2} name="bbm" id="bbm" variant="outlined" label="BBM" />
                <TextField onChange={handleChange} className={classes.root2} name="service" id="service" variant="outlined" label="Service" />
                <TextField onChange={handleChange} className={classes.root2} name="tunai" id="tunai" variant="outlined" label="Tunai"/>

                <Button variant="contained" type="submit" color="primary">Submit</Button>

            </CardContent>
        </Card>
    </form>
    </React.Fragment>
  );
}
