import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { red } from '@material-ui/core/colors';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormHelperText from '@material-ui/core/FormHelperText'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slider from '@material-ui/core/Slider';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledCardHeader = withStyles(theme => ({
  title: {
    color: "white",
    fontSize: "20px",
    fontWeight: "500"
  }
}))(CardHeader);  

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "10px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  header: {
    backgroundColor: "#FF3333",
    color: "white"
  },
  icon: {
    color: "white",
  },
  endbutton: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  expandOpen: {
    opacity: "0",
    transitionDuration: "3s"
  },
  input: {
      paddingTop: "20px"
  },
  addbutton: {
    margin: "20px",
    color: "#FF3333",
    borderColor: "#FF3333",
    '&:hover': {
      backgroundColor: "#FF3333",
      color: "#FFFFFF",
    }
  },
  cancelbutton: {
    margin: "20px",
    color: "#68737A",
    borderColor: "#68737A",
    '&:hover': {
      backgroundColor: "#68737A",
      color: "#FFFFFF",
    }
  },
  exitbutton: {
    margin: "10px",
    color: "#FF3333",
    borderColor: "#FF3333",
    '&:hover': {
      backgroundColor: "#FF3333",
      color: "#FFFFFF",
    }
  },
  continuebutton: {
    margin: "10px",
    color: "#68737A",
    borderColor: "#68737A",
    '&:hover': {
      backgroundColor: "#68737A",
      color: "#FFFFFF",
    }
  },
  errorText: {
    color: red
  }
}));

export default function CreateCustomer(props) {
  const classes = useStyles();

  const handleSliderChange = (event, newValue) => {
      if (newValue < 18) {
          newValue = 18
      }
    setFormDetails({
        ...formDetails,
        customerAge: newValue
    })
  };

  const [formDetails, setFormDetails] = React.useState({
    customerName: "",
    customerAge: 18,
    serviceOfficerName : "",
    NRIC : "",
    branchCode: "",
    image: "", 
    productType: ""
  });
  //for customer and officer name
  const [textValidation, setTextValidation] = React.useState({
    customerName: true,
    serviceOfficerName: true,
    NRIC: true,
    productType: true,
    branchCode: true
  });

  const handleTextDetailsChange = e => {
    setFormDetails({
        ...formDetails,
        [e.target.name]: e.target.value
    });
    if (e.target.value.length == 0) {
        setTextValidation({
            ...textValidation,
            [e.target.name]: true
        })
    } else {
      switch([e.target.name]){
        case "NRIC":
          if((e.target.value[0].match(/^[A-Z]*$/)) && (e.target.value[e.target.value.length - 1].match(/^[A-Z]*$/)) && (e.target.value.length === 9) && e.target.value.substr(1,e.target.value.length-2).match([0-9]))
          {
            setTextValidation({
              ...textValidation,
              [e.target.name]: false
            }) 
          }
          else
          {
            console.log("false");
          }
          break;
          default:
            break;

      }

    }
  }

  const [isEmpty, setIsEmpty] = useState(true);

  const [emptySnack, setEmptySnack] = useState(false);

  const [createCustomerSnack, setCreateCustomerSnack] = useState(false);
  
  const handleCreateCustomerSnack = () => {
    setCreateCustomerSnack(false);
  }

  const [isError, setIsError] = useState(true);
  
  const createNewCustomer = async e => {
    if (isEmpty) {
      setEmptySnack(true);
    } else {
      const res = await fetch("", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        //add authheader here
        body: JSON.stringify(formDetails)
      });

      const resData = await res.json();
      if (!res.ok) {
        setCreateCustomerSnack(true);
        setIsError(true);
        throw new Error(resData.message);
        
      } 
      else if (res.ok) {
          setFormDetails({
            customerName: "",
            customerAge: 18,
            serviceOfficerName : "",
            NRIC : "",
            branchCode: "",
            image: "", 
            productType: ""
          });
      console.log(resData);
      setIsError(false);
      setCreateCustomerSnack(true);
    }
  }
}
  const [exit2, setExit2] = React.useState(false);

  const handleExitOpen = () => {
    setExit2(true);
  }

  const handleExitClose = () => {
    setExit2(false);
    props.history.push("/");
  }

  const handleContinueClose = () => {
    setExit2(false);
  }
  const handleEmptySnack = () => {
    setEmptySnack(false);
  }

    const productTypes = ['137: Investor', '070: Insurance', '291: Loans', '969: Savings', '555: Credit Cards'];
    const branchCode = [120, 81];
    return(
        <Card className={classes.root}>
        <StyledCardHeader
          action={
            <IconButton aria-label="settings">
              <CloseIcon className={classes.icon} onClick={handleExitOpen}/>
            </IconButton>
          }
          title="CREATE CUSTOMER"
          className={classes.header}
        />
        <Dialog
             open={exit2}
             onClose={handleContinueClose}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
           >
          <DialogTitle id="alert-dialog-title">{"Exit 'Create Customer' Page?"}</DialogTitle>
             <DialogContent>
               <DialogContentText id="alert-dialog-description">
                 Are you sure you want to exit this page? (Changes made will not be saved)
               </DialogContentText>
             </DialogContent>
             <DialogActions>
             <Box className={classes.endbutton}>
          <Button onClick={handleExitClose} className={classes.exitbutton} variant="outlined">
            Yes
             </Button>
          <Button onClick={handleContinueClose} variant="outlined" className={classes.continuebutton} autoFocus>
            No
             </Button>
             </Box>
             </DialogActions>
           </Dialog>
        <CardContent>
        <Typography variant="h6" color="textSecondary">
            Enter Customer Details
          </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <br/>
            <form noValidate autoComplete="off">
            <TextField
            style={{ width: "100%"}}
              id="outlined-basic"
              label="Customer Name"
              name="customerName"
              required
              error = {textValidation.customerName ? true : false}
              
              value={formDetails.customerName}
              onChange={handleTextDetailsChange}
              helperText={textValidation.customerName ? "Please enter fullname!" : " "}
            />
          </form>
          <br/>
          <form noValidate autoComplete="off">
            <TextField
            style={{ width: "100%"}}
              id="outlined-basic"
              label="NRIC"
              name="NRIC"
              required
              error = {textValidation.NRIC ? true : false}
              value={formDetails.NRIC}
              onChange={handleTextDetailsChange}
              helperText={textValidation.NRIC ? "Please enter NRIC!" : " "}
            />
          </form>
          <br/>
          <FormControl  fullWidth error={textValidation.branchCode ? true : false}>
          <InputLabel id="demo-simple-select-outlined-label">
            Branch Code
          </InputLabel>
          <Select
            name="branchCode"
            value={formDetails.branchCode}
            onChange={handleTextDetailsChange}
            labelWidth="70"
            fullWidth 
          >
            {branchCode.map((item, index) => (
              <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
          </Select>
          <FormHelperText>{textValidation.branchCode ?  "Please select branch code!" : " "}</FormHelperText>
          
        </FormControl>
          <br/>
    
          </Grid>
          <Grid item xs={12} sm={6}>
          <form className={classes.input} noValidate autoComplete="off">
          <Typography>Customer Age:</Typography>
          <Slider
            style={{marginTop: "10px"}}
            value={formDetails.customerAge}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="on"
          />
          </form>
          <br/>
          <form noValidate autoComplete="off">
            <TextField
            style={{ width: "100%"}}
              id="outlined-basic"
              label="Service Officer Name"
              name="serviceOfficerName"
              required
              error = {textValidation.serviceOfficerName ? true : false}
              value={formDetails.serviceOfficerName}
              onChange={handleTextDetailsChange}
              helperText={textValidation.serviceOfficerName ? "Please enter officer name!" : " "}
            />
          </form>
          <br/>
          <FormControl  fullWidth error={textValidation.productType ? true : false}>
          <InputLabel id="demo-simple-select-outlined-label">
            Product Type
          </InputLabel>
          <Select
            name="productType"
            value={formDetails.productType}
            error={textValidation.productType}
            onChange={handleTextDetailsChange}
            labelWidth="70"
            fullWidth 
          >
            {productTypes.map((item, index) => (
              <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
          </Select>
          <FormHelperText>{textValidation.productType ?  "Please select product type!" : " "}</FormHelperText>
          
        </FormControl>
          <br/>
          </Grid>
          </Grid> 
      <CardActions className={classes.input}>
          <Box className={classes.expand}>
          <Button
          variant="outlined"
            className={classes.cancelbutton}
            onClick={handleExitOpen}
          >
          Cancel
          </Button>
          <Button
          variant="outlined"
            className={classes.addbutton}
            onClick={createNewCustomer}
          >
          Create
          </Button>
          </Box>
        </CardActions>
        <Snackbar open={createCustomerSnack} autoHideDuration={2000} onClose={isError ? handleCreateCustomerSnack : props.history.push("/")}>
          <Alert onClose={handleCreateCustomerSnack} severity={isError ? "error" : "success"}>
                        {isError ? "Failed to create customer, try again" : "Created customer successfully!"}
          </Alert>
       </Snackbar>
       <Snackbar open={emptySnack} autoHideDuration={2000} onClose={handleEmptySnack}>
          <Alert onClose={handleEmptySnack} severity="error">
                    Please fill in all required fields 
          </Alert>
       </Snackbar>
        </CardContent>
      </Card>
    );
}