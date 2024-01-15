// PROBLEM: graph2: on initialize selectedYears2 is an array of 1 number. Pero on submit, it is a sring, processed to array of numbers.
//solution: unang send sa useEffect: yung singlesend: tempselectedYears2 array of 1 numbber. Pero on handleSubmit2, selectedYears2 is a string. process on submit na lng
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
import ExportButton from '../components/excelFunctions/Export.js'; // Update the path



// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));




const ReportsPage = () => {
    //for formatting months
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const {sales_invoice_list, dispatch: salesInvoiceDispatch} = useSalesInvoiceContext()
    const {inventory_list,dispatch: inventoryDispatch} = useInventoryContext()

    const {user} = useAuthContext()

    //graph1
    const [selectedMonths, setSelectedMonths] = useState( () => {
        const currDate = new Date()
        const currmonth = monthNames[currDate.getMonth()];
        return [currmonth];
      })
    const [selectedYear, setSelectedYear] = useState( ()=> {
      const currDate = new Date()
      const Year = currDate.getFullYear()
      return Year
     })
    const [chartData1, setchartData1] = useState([])

    //graph 2
     const [selectedYears2, setSelectedYears2] = useState( ()=> {
      const currDate = new Date()
      const stringYear = currDate.getFullYear().toString()
      return stringYear
     })
    // const [selectedYears2, setSelectedYears2] = useState( () => {
    //   const currDate = new Date()
    //   const years_array2 = [currDate.getFullYear()]; // Initialize array with the current year
    //   return years_array2;
    // })
    const [chartData2, setchartData2] = useState({})

    //graph3
    const [selectedYear3, setSelectedYear3] = useState( () => { //ganto para ma pass dynamically made to be used sa useState
      const currDate = new Date()
      return currDate.getFullYear()
    })
    const [chartData3, setchartData3] = useState({})

    //graph4
    // const [selectedYears4, setSelectedYears4] = useState('')

    useEffect(() => {
      // console.log("value of initial months",selectedMonths)
      // console.log("value of initial years",selectedYear)
      
      const fetchData1 = async () => {
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
      }





        const fetchData3 = async () => { 
          try {
            const response = await fetch('/api/product/getAllmonthlyByYear', {
              method:'POST',
              body: JSON.stringify({selectedYear3}),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              }
            });
            if (response.ok) {
              const json = await response.json();
              console.log("JSON", json);
              setchartData3(json);
            } else {
              console.error('Failed to fetch data');
              setchartData3([]);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            setchartData3([]);
          }
        };

      const fetchData2 = async()=> {
        try {
          const splitArray = selectedYears2.split(',');
          // Step 2: Convert each split string to an integer
          const selectedYears2Array = splitArray.map(str => parseInt(str, 10));
          console.log("sentselectedyears2", selectedYears2Array)
          const response = await fetch('/api/salesinvoice/getYearTotal', {
            method:'POST',
            body: JSON.stringify({selectedYears2Array}),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          });
          if (response.ok) {
            const json = await response.json();
            console.log("JSON", json);
            setchartData2(json);
          } else {
            console.error('Failed to fetch data');
            setchartData2([]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setchartData2([]);
        }
        // Add your logic here.
          
  
      }
    

        fetchData1();
        fetchData3();
        fetchData2();
      }, [user]); // Include dependencies if needed



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

    //finish fetch at handlesubmit2, when working; copy paste to UseEffect
    const handleSubmit2 = async (e) => {
    //process here so that each year is separated by commas, and create a new array to sent
      //
      e.preventDefault(); 
      const splitArray = selectedYears2.split(',');

      // Step 2: Convert each split string to an integer
      const selectedYears2Array = splitArray.map(str => parseInt(str, 10));


      try {
        console.log("sentselectedyears2", selectedYears2Array)
        const response = await fetch('/api/salesinvoice/getYearTotal', {
          method:'POST',
          body: JSON.stringify({selectedYears2Array}),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const json = await response.json();
          console.log("JSON", json);
          setchartData2(json);
        } else {
          console.error('Failed to fetch data');
          setchartData2([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setchartData2([]);
      }
      // Add your logic here.
  };





    const handleSubmit3 = async (e) => {

        e.preventDefault();
        // Here you can perform actions like sending the selectedMonths and selectedYear to an endpoint.
        try {
          console.log("sentselectedyear3", selectedYear3)
          const response = await fetch('/api/product/getAllmonthlyByYear', {
            method:'POST',
            body: JSON.stringify({selectedYear3}),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          });
          if (response.ok) {
            const json = await response.json();
            console.log("JSON", json);
            setchartData3(json);
          } else {
            console.error('Failed to fetch data');
            setchartData3([]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setchartData3([]);
        }
        // Add your logic here.
    };
    
    




    const handleSelectMonths = (months) => {
        setSelectedMonths(months);
      };

    

    return (
    <Box sx={{display: 'grid', gridTemplateColumns: '210px 2fr', gap:0}}>
        <div><NavDrawer/></div>
        <div>
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {/* This is rezising for small screen but graphs inside dont resize with the Grid sooooo xs={6}  */}
                <Grid item> 
                    <Item>
                        <Stack  direction="row" alignItems="flex-start">
                        <MonthsDropdown onSelectMonths={handleSelectMonths} initialSelectedMonths={selectedMonths} />
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
                    <Grid item>
                    <Item>
                      <Stack  direction="row" alignItems="flex-start">
                        <form id="SelectedYears2">
                        <label> Year</label>
                        <input 
                            type="text" onChange={(e)=> setSelectedYears2(e.target.value)}
                            value={selectedYears2}
                        />
                        </form>
                        <button type="submit" className="green_button" onClick={(e) => handleSubmit2(e)}> Submit </button>
                      </Stack>
                      {chartData2.length > 0 && (
                        <BarChart
                            label='Bar Chart Title'
                            xAxis={[{ scaleType: 'band', data: chartData2.map(item => item._id), label: 'Year' }]}
                            series={[
                                {
                                    data: chartData2.map(item => item.totalSum),
                                    label: 'Yearly Total Sales (Php)'
                        
                                },
                            ]}
                            width={500}
                            height={300}
                        />
                        )
                        }
                    </Item>
                    </Grid>
                    <Grid item>
                    <Item>
                        {/* 3 */}
                        <Stack  direction="row" alignItems="flex-start">
                            <form id="SelectedYear">
                            <label> Year</label>
                            <input 
                                type="number" onChange={(e)=> setSelectedYear3(e.target.value)}
                                value={selectedYear3}
                            />
                            </form>
                            <button type="submit" className="green_button" onClick={(e) => handleSubmit3(e)}> Submit </button>
                        </Stack>
                        {/* checks if chartData3 exists so it won't error. basically since it's async, pag na load na tska siya ididisplay  */}
                        {/* data: Object.keys(chartData3).map(key => chartData3[key].date) */}
                        {chartData3.length > 0 && (
                        <BarChart
                            //  dataset={chartData3}
                            yAxis={[{scaleType: 'band',
                                data: chartData3.map(item => {
                                const dateObject = new Date(item.date);
                                const monthIndex = dateObject.getMonth();
                                //return monthIndex
                                return monthNames[monthIndex];      //the month string January...February... 
                                //basically this assumes and ensures na iisa lng yung entry per month ang papakita. 
                                //if may duplicate (i.e. 2 January entry, isa lng yung papakita)
                            })}]}
                            series={[{ data: Object.keys(chartData3).map(key => chartData3[key].inventory_value), label: 'Inventory Value (Php)'}]}
                            layout="horizontal"
                            xAxis={[{ label: 'Monthly Inventory Value (Php)' }]}

                            width={500}
                            height={300}
                        />)
                        }
                        {/* <LineChart
                            xAxis={[{ data: chartData3.map(item => item.date.toString()) }]}
                            series={[
                                {
                                    data: chartData3.map(item => item.inventory_value),
                                },
                            ]}
                            width={500}
                            height={300}
                            /> */}
                    </Item>
                    </Grid>
                    <Grid item>
                    <Item>
                        <ExportButton jsonData={chartData1} />
                    </Item>
                </Grid>
            </Grid>
        </Box>
        </div>
    </Box>
    );
}


export default ReportsPage;

//page={page} onChange={handlePage}

