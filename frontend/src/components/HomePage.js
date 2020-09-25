import React from 'react';
import {Button} from '@material-ui/core';
import authenticationService from '../services/authenticationService';
//port {DropzoneArea} from 'material-ui-dropzone'
import Dropzone from 'react-dropzone'

export default function HomePage(props) {
    const logout = e => {
        authenticationService.logout()
        props.history.push("/login");
    }

    const createCustomer = () => {
        props.history.push("/createcustomer");
    }





    return(<div>
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
            
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop image file here, or click to select image file</p>
              </div>
            </section>
          )}
        </Dropzone>

        <Button onClick={logout}>Logout</Button>
        <Button onClick={createCustomer}>Create Customer</Button>
        Im in home page!!</div>)
}