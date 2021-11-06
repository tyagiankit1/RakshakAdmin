import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { SimpleCard, Breadcrumb } from 'app/components'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { saveAs } from 'file-saver';
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    Tooltip,
    Button,
    TablePagination,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions
} from '@material-ui/core'
import InfluancerDetails from './InfluancerDetails';
import { getQRLotList, createQRLot, generateQRLot, downloadQRLot } from './QRFormService'
var axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const QRLotList = () => {
    const classes = useStyles()
    const history = useHistory()
    const infState = useSelector((state) => state.influancer)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [qrLotList, setQRLotList] = React.useState([]);
    const [isAlive, setIsAlive] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [selectedInfluancer, setSelectedInfluancer] = useState({})
    const [openCreateLot, setOpenCreateLot] = React.useState(false)

    function handleCreateLotOpen() {
        setOpenCreateLot(true)
    }

    function handleCreateLotClose() {
        setOpenCreateLot(false)
    }
    

    useEffect(() => {
        getLotList();
    }, [infState, isAlive])

    function getLotList(){

        // var config = {
        //     method: 'get',
        //     url: infState.api+'getQRLotList',
        //     headers: { 
        //       'Authorization': 'Bearer ' + localStorage.accessToken,
        //       'Content-Type': 'application/json'
        //     }
        //   };
          
        //   axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //     setIsAlive(false)
        //     if (isAlive) setQRLotList(response.data.qrLotList)
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });


        getQRLotList(infState).then(( data ) => {
            console.log("response: ", data.qrLotList);
            console.log("infState:", infState);
            setIsAlive(false)
            if (isAlive) setQRLotList(data.qrLotList)
        })
    }
    const generateQRLotZip = (qrLotId) => {
        console.log("data");
        setIsAlive(true);

        let payload = {
            "qrLotId": qrLotId
        }
        generateQRLot(infState, payload).then(( data ) => {
            console.log("response: ", data);
        })
    }

    function str2bytes (str) {
        var bytes = new Uint8Array(str.length);
        for (var i=0; i<str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
    }

    function downloadLot(qrLotId) {
        console.log("downlod---------------------> ", localStorage);
        let payload = {
            "qrLotId": qrLotId
        }
        
        var config = {
            method: 'post',
            url: infState.api + 'downloadQRLot',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : payload,
            responseType: 'blob'
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', qrLotId+`.zip`); //or any other extension
            document.body.appendChild(link);
            link.click();
          })
          .catch(function (error) {
            console.log(error);
          });

        
    }

    const createLot = () => {

        console.log("data");
        setIsAlive(true);

        let payload = {
            "lotSize": parseInt(document.getElementById('lotSize').value),
            "agent": "RC Team"
        }



        createQRLot(infState, payload).then(( data ) => {
            console.log("createLot response: ", data.QRLot);
            // alert(data.QRLot.qrLotId)
            setOpenCreateLot(false);
            
            generateQRLotZip(data.QRLot.qrLotId)
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    function handleClickOpen(event) {
        setSelectedInfluancer(qrLotList.find(x => x.userID === event.currentTarget.id));
        setShowDetails(true);
    }
    function handleClose() {
        setShowDetails(false);
        setSelectedInfluancer({});
    }
    return (
        <div className="analytics m-sm-30">
            {
                isAlive ? 
                <CircularProgress className={classes.progress} />
                :
                !showDetails ? 
                <div>
                
               <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    
                    action={
                    <IconButton aria-label="settings" onClick={handleCreateLotOpen} >
                        <Icon>queue</Icon>
                    </IconButton>
                    }
                    title="QR Lot List"
                />
                {/* <QRTable /> */}
               <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        {/* <TableCell className="px-0">Lot ID</TableCell> */}
                        <TableCell className="px-0">Created At</TableCell>
                        <TableCell className="px-0">Lot Size</TableCell>
                        <TableCell className="px-0">Lot Start</TableCell>
                        <TableCell className="px-0">Lot End</TableCell>
                        <TableCell className="px-0">Assign To</TableCell>
                        <TableCell className="px-0">Download</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {qrLotList
                        .map((qrLot, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                >
                                    {qrLot.createdAt.split('T')[0]}
                                    {/* <InfDetailsDialog influancerData={influancerData} /> */}
                                </TableCell>
                                <TableCell
                                    className="px-0"
                                    align="left"
                                >
                                    {qrLot.lotSize}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    RC{qrLot.qrLotStart}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    RC{qrLot.qrLotEnd}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {qrLot.assignedTo}
                                </TableCell>
                                <TableCell className="px-0">
                                    <Tooltip title="View Details" placement="top">
                                        <IconButton onClick={ () => downloadLot(qrLot.qrLotId) }>
                                            <Icon>file_download</Icon>
                                        </IconButton>
                                    </Tooltip>
                                    {/* <Button id={userData.userID} className={classes.button} color="primary"  onClick={() => handleClickOpen(userData)} >
                                    <Tooltip title="User Details" fontSize="large">
                                        <Icon fontSize="large">"arrow_forward"</Icon>
                                    </Tooltip>
                                    </Button> */}
                                    {/* {
                                        userData.status === 'Draft' ? <small className="border-radius-4 bg-error text-white px-2 py-2px">{userData.status}</small>
                                        : userData.status === 'Submitted' ?  <small className="border-radius-4 bg-secondary text-white px-2 py-2px">{userData.status}</small>
                                        : userData.status === 'Pending' ? <small className="border-radius-4 bg-primary text-white px-2 py-2px">{userData.status}</small>
                                        : userData.status === 'Active' ? <small className="border-radius-4 bg-green text-white px-2 py-2px">{userData.status}</small>
                                        : userData.status === 'In-Active' ? <small className="border-radius-4 bg-error text-white px-2 py-2px">{userData.status}</small>
                                        :''
                                    } */}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={qrLotList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            </Card>
            </div>
            : 
            <div>
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'User List', path: '/User/list' },
                            { name: 'Influancer Details' },
                        ]}
                    />
                </div>
                <InfluancerDetails userData={selectedInfluancer} />
            </div>
            }
            <Dialog
                open={openCreateLot}
                onClose={handleCreateLotClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Create QR Lot</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create the QR code Lot, please enter the Lot size
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lotSize"
                        label="Lot size"
                        type="number"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCreateLotClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={createLot} color="primary">
                        Create Lot
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default QRLotList
