import React, { Component } from "react";
import { Button } from '@material-ui/core';

class Homepage extends Component {

  render() {
    
    return (
      <React.Fragment>
        {/*Fragment to delete useless div tag*/}
        <Button href="/main/tambahdata" variant="contained" color="primary">Tambah Data Test</Button>
      </React.Fragment>
    );
  }
}

export default Homepage;
