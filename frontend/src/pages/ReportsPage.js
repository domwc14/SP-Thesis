import { useState, useEffect} from "react";
import { useClientsContext } from "../hooks/useClientsContext";
import { useSalesInvoiceContext } from "../hooks/useSalesInvoiceContext";
import { useInventoryContext } from "../hooks/useInventoryContext";

import { useAuthContext } from "../hooks/useAuthContext";


//mui table
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';

//components
import NavDrawer from "../components/NavDrawer";
import MonthsDropdown from '../components/DropDownMonths';



// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));




const ReportsPage = () => {
    const {sales_invoice_list, dispatch: salesInvoiceDispatch} = useSalesInvoiceContext()
    const {inventory_list,dispatch: inventoryDispatch} = useInventoryContext()

    const {user} = useAuthContext()

    //graph1
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedYear, setSelectedYear] = useState('')
    const [chartData1, setchartData1] = useState([])

    //graph3
    const [selectedYear3, setSelectedYear3] = useState('')
    const [chartData3, setchartData3] = useState([])

    //graph4
    const [selectedYears4, setSelectedYears4] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault();
        // Here you can perform actions like sending the selectedMonths and selectedYear to an endpoint.
        try {
            const response = await fetch('/api/salesinvoice/getTotal', {
                method:'POST',
                body: JSON.stringify({ selectedMonths, selectedYear }),
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
            });
        
            if (!response.ok) {
              // Handle error if needed
              console.error('Error:', response.statusText);
              return;
            }
        
            const data = await response.json();
            setchartData1(data);
        
            // Update LineChart with the data received from the backend
            // Modify this part based on the structure of your JSON response
          } catch (error) {
            // Handle fetch error
            console.error('Fetch error:', error.message);
          }
        // Add your logic here.
    };

    const handleSubmit3 = async (e) => {

        e.preventDefault();
        // Here you can perform actions like sending the selectedMonths and selectedYear to an endpoint.
        try {
            const response = await fetch('/api/product/getAllmonthly', {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
            });
        
            if (!response.ok) {
              // Handle error if needed
              console.error('Error:', response.statusText);
              return;
            }
        
            const data = await response.json();
            setchartData3(data);
            console.log("DATAOF3",data)
        
            // Update LineChart with the data received from the backend
            // Modify this part based on the structure of your JSON response
          } catch (error) {
            // Handle fetch error
            console.error('Fetch error:', error.message);
          }
        // Add your logic here.
    };
    
    





    const handleSelectMonths = (months) => {
        setSelectedMonths(months);
      };

    useEffect(()=>{
        const fetchAllmonthly = async () => {
            const response = await fetch('/api/product/getAllmonthly',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json() //its the response json from server
            if(response.ok){
                setchartData3(json)
                console.log("CHARTSHOULD BE HERE",chartData3)
            }
            else{
                console.log("Can't fetch Monthly Inventory Value")
            }
        }

        if(user){
            fetchAllmonthly()
        }
    },[user]) //everytime these dependencies are run / changed, rerun this function (in this case everytime may dispatch, re-run)

    return (
    <Box sx={{display: 'grid', gridTemplateColumns: '210px 2fr', gap:0}}>
        <div><NavDrawer/></div>
        <div>
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {/* This is rezising for small screen but graphs inside dont resize with the Grid sooooo xs={6}  */}
                <Grid item> 
                    <Item>
                        <Stack  direction="row" alignItems="flex-start">
                        <MonthsDropdown onSelectMonths={handleSelectMonths} />
                        <form id="SelectedYear">
                        <label> Year</label>
                        <input 
                            type="number" onChange={(e)=> setSelectedYear(e.target.value)}
                            value={selectedYear}
                        />
                        </form>
                        <button type="submit" className="green_button" onClick={(e) => handleSubmit(e)}> Submit </button>
                        </Stack>
                        <LineChart
                            xAxis={[{ data: chartData1.map(item => item._id) }]}
                            series={[
                                {
                                    data: chartData1.map(item => item.totalSum),
                                },
                            ]}
                            width={500}
                            height={300}
                            />

                        {/* { console.log(typeof(selectedMonths)) }
                        { console.log(selectedMonths) }
                        {selectedMonths} */}
                    </Item>
                </Grid>
                    <Grid item  md={4}>
                    <Item>2</Item>
                    </Grid>
                    <Grid item md={4}>
                    <Item>
                        {/* 3 */}
                        <Stack  direction="row" alignItems="flex-start">
                            <form id="SelectedYear">
                            <label> Year</label>
                            <input 
                                type="number" onChange={(e)=> setSelectedYear(e.target.value)}
                                value={selectedYear}
                            />
                            </form>
                            <button type="submit" className="green_button" onClick={(e) => handleSubmit3(e)}> Submit </button>
                        </Stack>
                        {/* <BarChart
                            // xAxis={[{ data: chartData1.map(item => item._id) }]}
                            yAxis={[{scaleType: 'band', data: chartData3.map(item => item.date)}]}
                            series={[{ data: chartData3.map(item => item.inventory_value), label: 'Inventory Value (Php)'}]}
                            layout="horizontal"
                            xAxis={[{ label: 'Monthly Inventory Value (Php)' }]}
                            width={500}
                            height={400}
                        /> */}
                        <LineChart
                            xAxis={[{ data: chartData3.map(item => item.date) }]}
                            series={[
                                {
                                    data: chartData3.map(item => item.inventory_value),
                                },
                            ]}
                            width={500}
                            height={300}
                            />
                    </Item>
                    </Grid>
                    <Grid item md={4}>
                    <Item>4</Item>
                </Grid>
            </Grid>
        </Box>
        </div>
    </Box>
    );
}


export default ReportsPage;

//page={page} onChange={handlePage}

