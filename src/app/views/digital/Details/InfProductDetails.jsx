import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    Card,
    TablePagination,
    Grid,
    Fab
} from '@material-ui/core'
import { Breadcrumb, SimpleCard } from 'app/components'
import AddInfProduct from './AddInfProduct';
import InfProductCard from './InfProductCard';
import { getInfProductList } from '../DigitalFormService'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: theme.spacing(2),
    },
}))

const InfProductDetails = (props) => {
    const classes = useStyles()
    const infState = useSelector((state) => state.influancer)
    const [isAlive, setIsAlive] = useState(true)
    const [infProductList, setInfProductList] = useState([])

    useEffect(() => {
        fetchProductDetails();
    }, [infState, isAlive])

    const fetchProductDetails = () => {
        let payload = {
            "Influencer_Id": props.influancerData.influencer_id
        }
        getInfProductList(infState, payload).then(( data ) => {
            console.log("response: ", data);
            console.log("infState:", infState);
            setIsAlive(false)
            if (isAlive) setInfProductList(data)
        })
    }

    return (
        <div className="analytics m-sm-30">
            <AddInfProduct influancerData = {props.influancerData} />
            <Grid container spacing={6}>
            {isAlive ? <CircularProgress className={classes.progress} /> : 
                infProductList.map((infProducts, index) => (                    
                    <InfProductCard key={index} infProducts={infProducts} />                    
                ))
            }
            </Grid>
        </div>
    )
}

export default InfProductDetails
