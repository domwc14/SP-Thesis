import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

async function modifyPdf(json) {

  console.log("inside the func",json)
  // Assuming SIPOM.pdf is in the public folder
  //Final would NOT BE File Path. created on the fly dapat. temporarily file path para ma align yung info
  // const filePath = '/SIPOMDR.pdf';
  // const existingPdfBytes = await fetch(filePath).then(res => res.arrayBuffer());

  // const pdfDoc = await PDFDocument.load(existingPdfBytes);
  // // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // const pages = pdfDoc.getPages();
  // const secondPage = pages[0];


  //actual PDF create (not modify)

  const pdfDoc = await PDFDocument.create();

  // Add two empty pages to the document
  const firstPage = pdfDoc.addPage();
  const secondPage = pdfDoc.addPage();



  // const { width, height } = firstPage.getSize();
  // firstPage.drawText('This text was added with JavaScript!', {
  //   x: 5,
  //   y: height / 2 + 300,
  //   size: 50,
  //   font: helveticaFont,
  //   color: rgb(0.95, 0.1, 0.1),
  //   rotate: degrees(-45),
  // });

  //1 line is y = 15

//TIN and DR missing

  //THIS IS THE CONTENT FOR THE FIRST PAGE SIPOM. UNCOMMENT FROM HERE AFTER
  //THIS IS THE CONTENT FOR THE FIRST PAGE SIPOM. UNCOMMENT FROM HERE AFTER

  //sold to
  firstPage.drawText(json.customer.name, { x: 78, y: 651, size: 11 })

  //address
  if(json.customer.location > 40){
    var firstPart = json.customer.location.substring(0, 40);
    var secondPart = json.customer.location.substring(40);
    firstPage.drawText(firstPart, { x: 78, y: 621, size: 11 })
    firstPage.drawText(secondPart, { x: 78, y: 606, size: 11 })
  }
  else{
    firstPage.drawText(json.customer.location, { x: 78, y: 621, size: 11 })
  }

  firstPage.drawText(json.customer.name, { x: 105, y: 591, size: 11 }) //busines style

  const dateObject = new Date(json.date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Month is zero-based, so we add 1
  const year = dateObject.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;
  console.log("DATE",formattedDate)
  firstPage.drawText(formattedDate, { x: 413, y: 651, size: 11 })

  firstPage.drawText(json.payment_terms, { x: 413, y: 636, size: 11 })
  firstPage.drawText(json.reference_PO, { x: 413, y: 621, size: 11 })


  //purchase_list
  let total_amount = 0
  // let x = 125
  let y = 550
  for (const obj of json.purchase_list) {  //total_amount , check if product is real in inventory and if stock > quantity sa purchase list
    //fetch of json here


    total_amount += parseFloat(obj.amount);
    firstPage.drawText(obj.quantity.toString(), { x: 28, y: y, size: 11 }) //quantity
    // firstPage.drawText(obj.quantity.toString(), { x: 75, y: y, size: 11 }) //unit
    firstPage.drawText(obj.product_code, { x: 125, y: y, size: 11 })  //article
    // firstPage.drawText(obj.quantity.toString(), { x: 75, y: y, size: 11 }) //unit_price
    firstPage.drawText(obj.amount.toString(), { x: 475, y: y, size: 11 }) 
    y = y - 15
    // console.log(existingProduct)
    // Do something with existingProduct if needed
  }


  //Total Sales
  let lessVAT = total_amount * .12 
  let netofVAT = total_amount - lessVAT
  lessVAT = lessVAT.toFixed(2)
  netofVAT = netofVAT.toFixed(2)
  //.toFixed(decimals) makes it string
  firstPage.drawText(netofVAT, { x: 320, y: 245, size: 11 }) //VATABLE sales 
  firstPage.drawText(lessVAT, { x: 320, y: 200, size: 11 }) //VAT AMOUNT  

  firstPage.drawText(total_amount.toString(), { x: 475, y: 275, size: 11 }) 
  firstPage.drawText(lessVAT, { x: 475, y: 260, size: 11 }) 
  firstPage.drawText(netofVAT, { x: 475, y: 245, size: 11 }) 
  firstPage.drawText(netofVAT, { x: 475, y: 215, size: 11 }) //Amount Due
  firstPage.drawText(lessVAT, { x: 475, y: 200, size: 11 })  //Add: VAT
  firstPage.drawText(total_amount.toString(), { x: 475, y: 185, size: 11 }) //TOTAL AMOUNT DUE


  //THE CONTENT OF SIPOM PAGE ONE ENDS HERE UNCOMMENT AFTER.
  //THE CONTENT OF SIPOM PAGE ONE ENDS HERE UNCOMMENT AFTER.

  //secondPage
  //secondPage

  secondPage.drawText(json.customer.name, { x: 78, y: 651, size: 11 })
  //address
  if(json.customer.location > 40){
    secondPage.drawText(firstPart, { x: 78, y: 621, size: 11 })
    secondPage.drawText(secondPart, { x: 78, y: 606, size: 11 })
  }
  else{
    secondPage.drawText(json.customer.location, { x: 78, y: 621, size: 11 })
  }

  // const dateObject2 = new Date(json.date);
  // const day2 = dateObject.getDate();
  // const month2 = dateObject.getMonth() + 1; // Month is zero-based, so we add 1
  // const year2 = dateObject.getFullYear();
  // const formattedDate2 = `${day}/${month}/${year}`;
  console.log("DATE",formattedDate)
  secondPage.drawText(formattedDate, { x: 312, y: 665, size: 11 })

  secondPage.drawText(json.payment_terms, { x: 312, y: 635, size: 11 })
  secondPage.drawText(json.reference_PO, { x: 312, y: 620, size: 11 })
  secondPage.drawText(json.invoice_number, { x: 312, y: 605, size: 11 })

  //purchase_list
  let y2 = 567
  for (const obj of json.purchase_list) {  //total_amount , check if product is real in inventory and if stock > quantity sa purchase list
    //fetch of json here

    secondPage.drawText(obj.quantity.toString(), { x: 25, y: y2, size: 11 }) //quantity
    // secondPage.drawText(obj.quantity.toString(), { x: 75, y: y, size: 11 }) //unit
    secondPage.drawText(obj.product_code, { x: 95, y: y2, size: 11 })  //article
    // secondPage.drawText(obj.quantity.toString(), { x: 75, y: y, size: 11 }) //unit_price
    y2 = y2 - 15
    // console.log(existingProduct)
    // Do something with existingProduct if needed
  }


  const pdfBytes = await pdfDoc.save(); 
  console.log("the PDF in bytes", pdfBytes)

  //Save document to computer 
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'ModifiedSIPOM.pdf';  //name of the downloaded file

  // Append the link to the document and click it
  document.body.appendChild(link);
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
  
}

export default modifyPdf