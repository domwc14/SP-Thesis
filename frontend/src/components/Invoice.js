import React from 'react'
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import { Fragment } from 'react';

//FINISH UP ON THE TABLE

const Invoice = (overdueSI) => {
    if(overdueSI){
        console.log("Inside INVOICE",overdueSI)
        console.log(overdueSI.customer.name)


        const dateObject = new Date(overdueSI.date);
        const formattedDate = new Intl.DateTimeFormat('en-US').format(dateObject);

        var locationchunks = [];

        //const chunkSize = 20;
        // for (let i = 0; i < overdueSI.customer.location.length; i += chunkSize) {
        //   const chunk = overdueSI.customer.location.slice(i, i + chunkSize);
        //   locationchunks.push(chunk);
        // }
        const locationstring = "Persafs Address, Las Pinas City"
        locationchunks = locationstring.split(',');

        //If the variables are in receipt data, no need for render. receipt_data
        console.log("formattedDate",formattedDate)
    const receipt_data = {
        "id": overdueSI.reference_PO,
        "invoice_no": overdueSI.invoice_number,
        "address": overdueSI.customer.location,
        "date": formattedDate,
        "items": overdueSI.purchase_list
        // "items": [
        // {
        //     "id": 1,
        //     "desc": overdueSI.customer.name,
        //     "qty": overdueSI.total_amount,
        //     "price": 179.25
        // },
        // {
        //     "id": 2,
        //     "desc": "incididunt cillum fugiat aliqua Lorem sit Lorem",
        //     "qty": 9,
        //     "price": 107.78
        // },
        // {
        //     "id": 3,
        //     "desc": "quis Lorem ad laboris proident aliqua laborum",
        //     "qty": 4,
        //     "price": 181.62
        // },
        // {
        //     "id": 4,
        //     "desc": "exercitation non do eu ea ullamco cillum",
        //     "qty": 4,
        //     "price": 604.55
        // },
        // {
        //     "id": 5,
        //     "desc": "ea nisi non excepteur irure Lorem voluptate",
        //     "qty": 6,
        //     "price": 687.08
        // }
        // ]
    }
    const styles = StyleSheet.create({
        page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },

        spaceBetween : {flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" },

        titleContainer: {flexDirection: 'row',marginTop: 24},
        
        logo: { width: 90 },

        reportTitle: {  fontSize: 16,  textAlign: 'center' },

        addressTitle : {fontSize: 11,fontStyle: 'bold'}, 
        
        invoice : {fontWeight: 'bold',fontSize: 20},
        
        invoiceNumber : {fontSize: 11,fontWeight: 'bold'}, 
        
        address : { fontWeight: 400, fontSize: 10},
        
        theader : {marginTop : 20,fontSize : 10,fontStyle: 'bold',paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:20,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

        theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

        tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

        total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

        tbody2:{ flex:2, borderRightWidth:1, }
        
        });


    //const logo = require('./persafslogo.png'); // Adjust the path based on your project structure
    const InvoiceTitle = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <Image style={styles.logo} source={'HTTP://localhost:3000/persafslogo.png'} alt="LOGO" />
                <Text render={() => overdueSI.customer.name}  style={styles.reportTitle}/>
            </View>
        </View>
    );

    const Address = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View>
                    <Text style={styles.invoice}>Invoice </Text>
                    <Text style={styles.invoiceNumber}>Invoice number: {receipt_data.invoice_no} </Text>
                </View>
                <View>
                    { Array.isArray(locationchunks) && locationchunks.map((line, index) => (
                        <Text key={index} style={styles.addressTitle}>
                        {line}
                        </Text>
                    ))}
                    {/* <Text style={styles.addressTitle}>7, Ademola Odede, </Text>
                    <Text style={styles.addressTitle}>Ikeja,</Text>
                    <Text style={styles.addressTitle}>Lagos, Nigeria.</Text> */}
                </View>
            </View>
        </View>
    );

    const UserAddress = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View style={{maxWidth : 200}}>
                    <Text style={styles.addressTitle}>Bill to </Text>
                    <Text style={styles.address}>
                    {receipt_data.address}
                    </Text>
                </View>
            <Text style={styles.addressTitle}>{receipt_data.date}</Text>
            </View>
        </View>
    );

    const TableHead = () => (
        <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
        <View style={[styles.theader, styles.theader2]}>
            <Text >Items</Text>   
        </View>
        <View style={styles.theader}>
            <Text>Price</Text>   
        </View>
        <View style={styles.theader}>
            <Text>Qty</Text>   
        </View>
        <View style={styles.theader}>
            <Text>Amount</Text>   
        </View>
        </View>
    );

    const TableBody = () => (
        receipt_data.items.map((item_purchase)=>(
            <Fragment key={item_purchase._id}>
                <View style={{ width:'100%', flexDirection :'row'}}>
                    <View style={[styles.tbody, styles.tbody2]}>
                        <Text>{item_purchase.product_code} </Text>  
                    {/* <Text render={() => receipt.desc} fixed /> */}
                    </View>
                    <View style={styles.tbody}>
                        <Text>{(item_purchase.amount / item_purchase.quantity).toFixed(2)} </Text>   
                    </View>
                    <View style={styles.tbody}>
                        <Text>{item_purchase.quantity}</Text>   
                    </View>
                    <View style={styles.tbody}>
                        <Text>{item_purchase.amount} </Text>  
                    </View>

                </View>
            </Fragment>
        ))
    );

    const TableTotal = () => (
        <View style={{ width:'100%', flexDirection :'row'}}>
        <View style={styles.total}>
            <Text></Text>   
        </View>
        <View style={styles.total}>
            <Text> </Text>   
        </View>
        <View style={styles.tbody}>
            <Text>Total</Text>   
        </View>
        <View style={styles.tbody}>
            <Text>
                {/* {receipt_data.items.reduce((sum, item)=> sum + item.amount, 0)} */}
                {overdueSI.total_amount}
            </Text>  
        </View>
        </View>
    );

    return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <InvoiceTitle  />
                    <Address/>
                    <UserAddress/>
                    <TableHead/>
                    <TableBody/>
                    <TableTotal/>
                </Page>
            </Document>
    )
    }
}
    export default Invoice
