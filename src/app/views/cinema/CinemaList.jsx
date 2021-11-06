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
import InfluancerDetails from './InfluancerDetails';
import { getCinemaList } from './CinemaFormService'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const CinemaList = () => {
    const classes = useStyles()
    const history = useHistory()
    const infState = useSelector((state) => state.influancer)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [cinemaDataList, setCinemaDataList] = React.useState([]);
    const [isAlive, setIsAlive] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [selectedInfluancer, setSelectedInfluancer] = useState({})
    
    

    useEffect(() => {
        getCinemaList(infState).then(( data ) => {
            console.log("response: ", data);
            console.log("infState:", infState);
            setIsAlive(false)
            if (isAlive) setCinemaDataList(data)
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
        setSelectedInfluancer(cinemaDataList.find(x => x.cinema_id === event.currentTarget.id));
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
                            { name: 'Influancer List' },
                        ]}
                    />
                </div>
               <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Name</TableCell>
                        <TableCell className="px-0">Seats</TableCell>
                        <TableCell className="px-0">Email</TableCell>
                        <TableCell className="px-0">Contact</TableCell>
                        <TableCell className="px-0">City</TableCell>
                        <TableCell className="px-0">Category</TableCell>
                        <TableCell className="px-0">Mall Name</TableCell>
                        <TableCell className="px-0">Screen</TableCell>
                        <TableCell className="px-0">Reach</TableCell>
                        <TableCell className="px-0">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cinemaDataList
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((cinemaData, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    width="20%"
                                >
                                    <Button id={cinemaData.cinema_id} className={classes.button} color="primary"  onClick={handleClickOpen} >
                                        {cinemaData.name}
                                    </Button>
                                    {/* <InfDetailsDialog cinemaData={cinemaData} /> */}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {cinemaData.seats}
                                </TableCell>
                                <TableCell
                                    className="px-0"
                                    align="left"
                                >
                                    {cinemaData.email}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {cinemaData.contact}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {cinemaData.city}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {cinemaData.category}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {cinemaData.mall_name}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {cinemaData.screen}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {cinemaData.reach}
                                </TableCell>
                                <TableCell className="px-0">
                                    {
                                        cinemaData.status === 'Draft' 
                                        ? <small className="border-radius-4 bg-error text-white px-2 py-2px">{cinemaData.status}</small>
                                        : cinemaData.status === 'Submitted' ?  <small className="border-radius-4 bg-secondary text-white px-2 py-2px">{cinemaData.status}</small>
                                        : <small className="border-radius-4 bg-primary text-white px-2 py-2px">{cinemaData.status}</small>
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
                count={cinemaDataList.length}
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
                            { name: 'Influancer List', path: '/influancer/list' },
                            { name: 'Influancer Details' },
                        ]}
                    />
                </div>
                <InfluancerDetails cinemaData={selectedInfluancer} />
            </div>
            }
        </div>
    )
}

export default CinemaList
