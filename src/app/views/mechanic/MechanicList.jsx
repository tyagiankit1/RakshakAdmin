import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { SimpleCard, Breadcrumb } from 'app/components'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    Tooltip,
    Card,
    CardHeader,
    TablePagination,
    Button,
    Fab
} from '@material-ui/core'
import UserDetails from './UserDetails';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { getAllMechanicDetails, cleanMechanicData } from './InfluancerFormService'

var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const MechanicList = () => {
    const classes = useStyles()
    const history = useHistory()
    const [state, setState] = useState({})
    const infState = useSelector((state) => state.influancer)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [mechanicDataList, setMechanicDataList] = React.useState([]);
    const [isAlive, setIsAlive] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [openCreateLot, setOpenCreateLot] = React.useState(false)
    
    

    useEffect(() => {
        getMechanicData();
    }, [infState, isAlive])

    function getMechanicData() {
        getAllMechanicDetails(infState).then(( data ) => {
            console.log("response: ", data);
            setIsAlive(false)
            if (isAlive) setMechanicDataList(data)
        })
    }

    const cleanMechanicList = () => {
        setIsAlive(true);
        cleanMechanicData(infState).then(( data ) => {
            console.log("response: ", data);
            getMechanicData();
        })
    }

    const uploadMechanicData = () => {
        setIsAlive(true);
        var data = new FormData();
            data.append('file', picture);

            var config = {
            method: 'post',
            url: infState.api+'uploadMechanicXls',
            data : data
            };

            axios(config)
            .then(function (response) {
                setIsAlive(true);
                console.log(JSON.stringify(response.data));
                getMechanicData();
                setOpenCreateLot(false)
            })
            .catch(function (error) {
            console.log(error);
            });
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.files[0],
        }) 
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleClickOpen = () => {
        setOpenCreateLot(true)
    }

    function handleCreateLotClose() {
        setOpenCreateLot(false)
    }
    
    function handleClose() {
        setShowDetails(false);
        setSelectedUser({});
    }

    const {
        picture
    } = state

    return (
        <div className="analytics m-sm-30">
            {
                isAlive ? 
                <CircularProgress className={classes.progress} />
                :
                !showDetails ? 
                <div>
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'RakshakQR Code mechanic list' },
                        ]}
                    />
                </div>
                <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    
                    action={
                    <>
                        <IconButton aria-label="settings" onClick={cleanMechanicList} >
                            <Icon>delete_sweep</Icon>
                        </IconButton>
                        <IconButton aria-label="settings" onClick={handleClickOpen} >
                            <Icon>queue</Icon>
                        </IconButton>
                    </>
                    }
                    title="QR Lot List"
                />
               <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Name</TableCell>
                        <TableCell className="px-0">Address</TableCell>
                        <TableCell className="px-0">Contact</TableCell>
                        <TableCell className="px-0">Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mechanicDataList
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((mechanicData, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    width="20%"
                                >
                                    {mechanicData.name}
                                    {/* <InfDetailsDialog influancerData={influancerData} /> */}
                                </TableCell>
                                {/* <TableCell
                                    className="px-0"
                                    align="left"
                                >
                                    {userData.email}
                                </TableCell> */}
                                <TableCell className="px-0 capitalize">
                                    {mechanicData.address}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {mechanicData.contact}
                                </TableCell>
                                {/* <TableCell className="px-0 capitalize">
                                    {userData.address}
                                </TableCell> */}
                                {/* <TableCell className="px-0 capitalize">
                                    {mechanicData.state}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {mechanicData.refCode}
                                </TableCell> */}
                                <TableCell className="px-0">
                                    <Tooltip title="View Details" placement="top">
                                        <IconButton >
                                            <Icon>arrow_right_alt</Icon>
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
                count={mechanicDataList.length}
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
                            { name: 'User Details' },
                        ]}
                    />
                </div>
                <UserDetails userData={selectedUser} />
            </div>
            }
        <Dialog
                open={openCreateLot}
                onClose={handleCreateLotClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Upload Mechanic xls
                </DialogTitle>
                <DialogContent>
                <div className="flex flex-wrap mb-6">
                    <label htmlFor="upload-single-file">
                        <Fab
                            className="capitalize"
                            color="primary"
                            component="span"
                            variant="extended"
                        >
                            <div className="flex items-center">
                                <Icon className="pr-8">cloud_upload</Icon>
                                <span>Upload File</span>
                            </div>
                        </Fab>
                        </label>
                        <input
                            className="hidden"
                            onChange={handleChange}
                            id="upload-single-file"
                            type="file"
                            name="picture"
                        />
                        {picture !== undefined ?<div style={{paddingLeft: '10px'}} className="flex items-center"><span>{picture.name}</span></div> : ''}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCreateLotClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={ uploadMechanicData } >
                        Upload Mechanics
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}

export default MechanicList
