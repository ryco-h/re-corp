import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import TambahDataindex from '../Tambahdata/tambahdata';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function Editable() {

  const { useEffect, useState } = React;

  async function fetchData() {

    const res = await fetch(`https://rockyryco0.pythonanywhere.com/auth/nasabah/`,{
      method: 'GET',
      mode: 'cors',
      headers: {'content-type': 'application/json'}
    })
  res
  .json()
  .then(res => setData(res))
  }

  useEffect(() => {
     fetchData()
  }, []);

  const [columns] = useState([
    { title: 'Tanggal', field: 'tanggal', tooltip: 'filter'},
    { title: 'No. Registrasi', field: 'no_regis'},
    { title: 'Nama Nasabah', field: 'nama_nasabah'},
    { title: 'Pinjaman Ke-', field: 'pinjaman_ke', align: 'center'},
    { title: 'Kasbon', field: 'kasbon', type: 'currency', filtering: false, render: rowData => {
      return new Intl.NumberFormat('ID', { style: 'currency', currency: 'IDR' }).format(rowData.kasbon)
    }},
    { title: 'Storting', field: 'storting', type: 'currency', filtering: false, render: rowData => {
      return new Intl.NumberFormat('ID', { style: 'currency', currency: 'IDR' }).format(rowData.storting);
    }},
    { title: 'ADM', field: 'adm', type: 'currency', filtering: false, render: rowData => {
      return new Intl.NumberFormat('ID', { style: 'currency', currency: 'IDR' }).format(rowData.adm);
    }},
    { title: 'Drop-an', field: 'drop_an', type: 'currency', filtering: false, render: rowData => {
      return new Intl.NumberFormat('ID', { style: 'currency', currency: 'IDR' }).format(rowData.drop_an);
    }},
    { title: 'Tabungan In/Out', field: 'tabungan_in_out', type: 'currency', filtering: false, render: rowData => {
      return new Intl.NumberFormat('ID', { style: 'currency', currency: 'IDR' }).format(rowData.tabungan_in_out);
    }},
    { title: 'BBM', field: 'bbm', type: 'currency', filtering: false, render: rowData => {
      return new Intl.NumberFormat('ID', { style: 'currency', currency: 'IDR' }).format(rowData.bbm);
    }},
    { title: 'Service', field: 'service', type: 'currency', filtering: false, render: rowData => {
      return new Intl.NumberFormat('ID', { style: 'currency', currency: 'IDR' }).format(rowData.service);
    }},
    { title: 'Tunai', field: 'tunai', type: 'currency', filtering: false, render: rowData => {
      return new Intl.NumberFormat('ID', { style: 'currency', currency: 'IDR' }).format(rowData.tunai);
    }}
  ]);

  const [data, setData] = useState([]);

  const handleRowUpdate = (newData, oldData, resolve) => {  
    
      axios.patch("https://rockyryco0.pythonanywhere.com/auth/nasabah/"+newData.id+'/', newData)
        .then(res => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve()
        })
    }

    const handleRowDelete = (oldData, resolve) => {  

      axios.delete("https://rockyryco0.pythonanywhere.com/auth/nasabah/"+oldData.id+'/', oldData)
        .then(res => {
          const dataDelete = [...data];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setData([...dataDelete]);
          resolve()
        })
    }
    
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const customColumnStyle = { minWidth: "200px" };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <React.Fragment>
    <MaterialTable
      icons={tableIcons}
      title="Data Nasabah"
      columns={columns}
      data={data}
      options={{
        actionsColumnIndex: 0,
        filtering: true,
        exportButton: true,
        padding: "default",
        headerStyle: customColumnStyle
      }}
      actions={[
        {
          icon: tableIcons.Add,
          tooltip: 'Tambah Data Nasabah',
          isFreeAction: true,
          onClick: (event) => handleOpen()
        }
      ]}
      editable={{
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            handleRowDelete(oldData, resolve)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            handleRowUpdate(newData, oldData, resolve)}
            ),
      }}
      localization={{
        header: {
          actions: "Pilihan"
        },
        body: {
           deleteTooltip: "Hapus",
           editTooltip: "Edit",
        },
        toolbar: {
            exportTitle: "Download Data",
            searchPlaceholder: "Cari nasabah/No. Registrasi",
        }
      }}
    />
    <Button style={{ marginTop: '20px' }} variant="contained" color="primary" onClick={handleOpen}>Tambah Data</Button>
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md"
      fullScreen={fullScreen}
    >
        <DialogContent>
          <TambahDataindex/>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
