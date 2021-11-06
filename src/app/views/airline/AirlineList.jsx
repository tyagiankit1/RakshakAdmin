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
    Button,
    TablePagination,
} from '@material-ui/core'
import AirlineDetails from './AirlineDetails'
import { getAirlineList } from './AirlineFormService'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const AirlineList = () => {
    const classes = useStyles()
    const history = useHistory()
    const infState = useSelector((state) => state.influancer)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [airlineDataList, setAirlineDataList] = React.useState([]);
    const [isAlive, setIsAlive] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [selectedAirline, setSelectedAirline] = useState({})
    
    

    useEffect(() => {
        getAirlineList(infState).then(( data ) => {
            console.log("response: ", data);
            console.log("infState:", infState);
            setIsAlive(false)
            if (isAlive) setAirlineDataList(data)
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
        setSelectedAirline(airlineDataList.find(x => x.airport_id === event.currentTarget.id));
        setShowDetails(true);
    }
    function handleClose() {
        setShowDetails(false);
        setSelectedAirline({});
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
                            { name: 'Airline List' },
                        ]}
                    />
                </div>
               <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Name</TableCell>
                        <TableCell className="px-0">Email</TableCell>
                        <TableCell className="px-0">Contact</TableCell>
                        <TableCell className="px-0">City</TableCell>
                        <TableCell className="px-0">Category</TableCell>
                        <TableCell className="px-0">Reach</TableCell>
                        <TableCell className="px-0">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {airlineDataList
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((airlineData, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    width="20%"
                                >
                                    <Button id={airlineData.airport_id} className={classes.button} color="primary"  onClick={handleClickOpen} >
                                        {airlineData.name}
                                    </Button>
                                    {/* <InfDetailsDialog airlineData={airlineData} /> */}
                                </TableCell>
                                
                                <TableCell
                                    className="px-0"
                                    align="left"
                                >
                                    {airlineData.email}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {airlineData.contact}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {airlineData.city}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {airlineData.category}
                                </TableCell>
                                <TableCell className="px-2 capitalize">
                                    {airlineData.reach}
                                </TableCell>
                                
                                <TableCell className="px-0">
                                    {
                                         airlineData.status === 'Draft' ? <small className="border-radius-4 bg-error text-white px-2 py-2px">{airlineData.status}</small>
                                         : airlineData.status === 'Submitted' ?  <small className="border-radius-4 bg-secondary text-white px-2 py-2px">{airlineData.status}</small>
                                         : airlineData.status === 'Pending' ? <small className="border-radius-4 bg-primary text-white px-2 py-2px">{airlineData.status}</small>
                                         : airlineData.status === 'Active' ? <small className="border-radius-4 bg-green text-white px-2 py-2px">{airlineData.status}</small>
                                         : airlineData.status === 'In-Active' ? <small className="border-radius-4 bg-error text-white px-2 py-2px">{airlineData.status}</small>
                                         :''
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={airlineDataList.length}
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
                            { name: 'Airline List', path: '/airline/list' },
                            { name: 'Airline Details' },
                        ]}
                    />
                </div>
                <AirlineDetails airlineData={selectedAirline} />
            </div>
            }
        </div>
    )
}

export default AirlineList
