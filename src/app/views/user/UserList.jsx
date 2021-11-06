import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    Button,
    TablePagination,
} from '@material-ui/core'
import UserDetails from './UserDetails';
import { getUserList } from './InfluancerFormService'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const UserList = () => {
    const classes = useStyles()
    const history = useHistory()
    const infState = useSelector((state) => state.influancer)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [userDataList, setUserDataList] = React.useState([]);
    const [isAlive, setIsAlive] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    
    

    useEffect(() => {

        
        // var config = {
        //     method: 'get',
        //     url: infState.api+'getUserList',
        //     headers: { 
        //       'Authorization': 'Bearer ' + localStorage.accessToken, 
        //       'Content-Type': 'application/json'
        //     }
        //   };
          
        //   axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //     setIsAlive(false)
        //     if (isAlive) setUserDataList(response.data.userList)
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        getUserList(infState).then(( data ) => {
            console.log("response: ", data.userList);
            console.log("infState:", infState);
            setIsAlive(false)
            if (isAlive) setUserDataList(data.userList)
        })
    }, [infState, isAlive])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    function handleClickOpen(userData) {
        console.log("userData: ", userData);
        setSelectedUser(userData);
        setShowDetails(true);
    }
    function handleClose() {
        setShowDetails(false);
        setSelectedUser({});
    }
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
                            { name: 'RakshakQR Code user list' },
                        ]}
                    />
                </div>
               <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Name</TableCell>
                        {/* <TableCell className="px-0">Email</TableCell> */}
                        <TableCell className="px-0">Contact</TableCell>
                        <TableCell className="px-0">City</TableCell>
                        {/* <TableCell className="px-0">Address</TableCell>                         */}
                        <TableCell className="px-0">State</TableCell>
                        <TableCell className="px-0">Ref. Code</TableCell>
                        <TableCell className="px-0">Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userDataList
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((userData, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    width="20%"
                                >
                                    {userData.name}
                                    {/* <InfDetailsDialog influancerData={influancerData} /> */}
                                </TableCell>
                                {/* <TableCell
                                    className="px-0"
                                    align="left"
                                >
                                    {userData.email}
                                </TableCell> */}
                                <TableCell className="px-0 capitalize">
                                    {userData.contactNo}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {userData.city}
                                </TableCell>
                                {/* <TableCell className="px-0 capitalize">
                                    {userData.address}
                                </TableCell> */}
                                <TableCell className="px-0 capitalize">
                                    {userData.state}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {userData.refCode}
                                </TableCell>
                                <TableCell className="px-0">
                                    <Tooltip title="View Details" placement="top">
                                        <IconButton onClick={() => handleClickOpen(userData)}>
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
                count={userDataList.length}
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
        </div>
    )
}

export default UserList
