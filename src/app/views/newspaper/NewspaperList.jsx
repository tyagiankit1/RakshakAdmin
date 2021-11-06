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
import { getNewspaperList } from './NewspaperFormService'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const NewspaperList = () => {
    const classes = useStyles()
    const history = useHistory()
    const infState = useSelector((state) => state.influancer)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [newspaperDataList, setNewspaperDataList] = React.useState([]);
    const [isAlive, setIsAlive] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [selectedInfluancer, setSelectedInfluancer] = useState({})
    
    

    useEffect(() => {
        getNewspaperList(infState).then(( data ) => {
            console.log("response: ", data);
            console.log("infState:", infState);
            setIsAlive(false)
            if (isAlive) setNewspaperDataList(data)
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
        setSelectedInfluancer(newspaperDataList.find(x => x.influencer_id === event.currentTarget.id));
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
                        <TableCell className="px-0">Circulation</TableCell>
                        <TableCell className="px-0">Email</TableCell>
                        <TableCell className="px-0">Contact</TableCell>
                        <TableCell className="px-0">City</TableCell>
                        <TableCell className="px-0">Category</TableCell>
                        <TableCell className="px-0">Language</TableCell>
                        <TableCell className="px-0">Frequency</TableCell>
                        <TableCell className="px-0">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {newspaperDataList
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((newspaperData, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    width="20%"
                                >
                                    <Button id={newspaperData.influencer_id} className={classes.button} color="primary"  onClick={handleClickOpen} >
                                        {newspaperData.name}
                                    </Button>
                                    {/* <InfDetailsDialog newspaperData={newspaperData} /> */}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {newspaperData.circulation}
                                </TableCell>
                                <TableCell
                                    className="px-0"
                                    align="left"
                                >
                                    {newspaperData.email}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {newspaperData.contact}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {newspaperData.city}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {newspaperData.category}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {newspaperData.language}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {newspaperData.frequency}
                                </TableCell>
                                <TableCell className="px-0">
                                    {
                                        newspaperData.status === 'Draft' 
                                        ? <small className="border-radius-4 bg-error text-white px-2 py-2px">{newspaperData.status}</small>
                                        : newspaperData.status === 'Submitted' ?  <small className="border-radius-4 bg-secondary text-white px-2 py-2px">{newspaperData.status}</small>
                                        : <small className="border-radius-4 bg-primary text-white px-2 py-2px">{newspaperData.status}</small>
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
                count={newspaperDataList.length}
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
                <InfluancerDetails newspaperData={selectedInfluancer} />
            </div>
            }
        </div>
    )
}

export default NewspaperList
