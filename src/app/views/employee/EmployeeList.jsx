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
    Button,
    TablePagination,
} from '@material-ui/core'

import InfluancerDetails from './InfluancerDetails';
import { getEmployeeList } from './InfluancerFormService'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const EmployeeList = () => {
    const classes = useStyles()
    const history = useHistory()
    const infState = useSelector((state) => state.influancer)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [empDataList, setEmpDataList] = React.useState([]);
    const [isAlive, setIsAlive] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [selectedInfluancer, setSelectedInfluancer] = useState({})
    
    

    useEffect(() => {
        // var settings = {
        //     "url": "https://services.rakshakcode.com/api/getEmpList",
        //     "method": "GET",
        //     "timeout": 0,
        //     "headers": {
        //       "Authorization": "Bearer "+localStorage.accessToken,
        //       "Content-Type": "application/json"
        //     },
        //   };
          
        //   $.ajax(settings).done(function (response) {
        //     console.log("response: ", data);
        //     console.log("infState:", infState);
        //     setIsAlive(false)
        //     if (isAlive) setEmpDataList(data)
        //   });
        getEmployeeList(infState).then(( data ) => {
            console.log("response: ", data);
            console.log("infState:", infState);
            setIsAlive(false)
            if (isAlive) setEmpDataList(data)
        })
    }, [infState, isAlive])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    function handleClickOpen(event) {
        setSelectedInfluancer(empDataList.find(x => x.userID === event.currentTarget.id));
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
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'RakshakQR Code employee list' },
                        ]}
                    />
                </div>
               <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        {/* <TableCell className="px-0">Picture</TableCell> */}
                        <TableCell className="px-0">Name</TableCell>
                        <TableCell className="px-0">Gender</TableCell>
                        <TableCell className="px-0">Email</TableCell>
                        <TableCell className="px-0">Contact</TableCell>
                        <TableCell className="px-0">Address</TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {empDataList
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((empData, index) => (
                            <TableRow key={index}>
                                
                                <TableCell
                                    className="px-0"
                                    align="left"
                                >
                                    {empData.name}
                                </TableCell>
                                <TableCell className="px-0 capitalize" align="left">
                                    {empData.gender}
                                </TableCell>
                                <TableCell className="px-0 capitalize" align="left">
                                    {empData.email}
                                </TableCell>
                                <TableCell className="px-0 capitalize" align="left">
                                    {empData.contactNo}
                                </TableCell>
                                <TableCell className="px-0 capitalize"align="left">
                                    {empData.address}
                                </TableCell>
                                
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={empDataList.length}
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
                            { name: 'Influancer Details' },
                        ]}
                    />
                </div>
                <InfluancerDetails userData={selectedInfluancer} />
            </div>
            }
        </div>
    )
}

export default EmployeeList
