import React, { useState, useEffect } from 'react'
import { 
    Card,
    Button,
    Tabs,
    Tab,
    Grid
 } from '@material-ui/core'

const InfProductCard = (props) => {
    const [productData] = useState(props.infProducts)
    const [tabIndex, setTabIndex] = React.useState(0)
    return (
        <Grid item lg={4} md={4} sm={12} xs={12} spacing={3}>
        <Card className="p-sm-24 mb-6">
            <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12} className="text-right">
                    {
                        productData.status === 'Active' 
                        ? <small className="border-radius-4 bg-green text-white px-2 py-2px">{productData.status}</small>
                        : <small className="border-radius-4 bg-error text-white px-2 py-2px">{productData.status}</small>
                    }
                </Grid>
            </Grid>
            <Card
                elevation={0}
                className="box-shadow-none text-center relative bg-light-primary p-sm-24"
                style={{height: '200px !important'}}
            >
                
                <h4>{productData.type}</h4>
                <h5>{productData.name}</h5>
                <Tabs
                    className="mt-3 mb-3"
                    value={tabIndex}
                    onChange={(e, value) => setTabIndex(value)}
                    indicatorColor="primary"
                    textColor="primary"
                    style={{minWidth: '72px !important'}}
                >
                    {['Rate', 'Info', 'Step'].map((item, ind) => (
                        <Tab
                            className="capitalize"
                            value={ind}
                            label={item}
                            key={ind}
                            style={{minWidth: '72px !important'}}
                        />
                    ))}
                </Tabs>
                {tabIndex === 0 && <>
                    {
                    productData.rate_type === 'On Request'? <h2>{productData.rate_type}</h2>
                    : productData.rate_type === 'Fixed Rate' ? <Grid container spacing={6}><Grid item lg={12} md={12} sm={12} xs={12}><h5>Fixed Rate: </h5><br />{"₹ " + parseInt(productData.fixed_rate).toLocaleString()}</Grid></Grid>
                    : <Grid container spacing={6}><Grid item lg={6} md={6} sm={12} xs={12}><h5>Card Rate: </h5><br />{"₹ " + parseInt(productData.card_rate).toLocaleString()}</Grid><Grid item lg={6} md={6} sm={12} xs={12} ><h5>Offer Rate:</h5> <br />{"₹ " + parseInt(productData.offer_rate).toLocaleString()}</Grid></Grid>
                    }
                </>}
                {tabIndex === 1 && <h2>{productData.info}</h2>}
                {tabIndex === 2 && <h2>{productData.step}</h2> }
                
            </Card>
        </Card>
        </Grid>
    )
}

export default InfProductCard
