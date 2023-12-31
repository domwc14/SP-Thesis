const nodemailer = require('nodemailer')

const sendEmail = async(req,res)=>{
    const { receiver, subject, messageBody,CC} = req.body;

    console.log("inside backendr,", receiver)
    console.log("inside backends,", subject)
    console.log("inside backendm,", messageBody)

    const transporter = nodemailer.createTransport ( {
        service: "hotmail",
        auth: {
            user: process.env.emailusername,
            pass: process.env.emailpassword
        }
    });

    //stops app from crashing if d nakuha file
    if (!req.file) {
        const options2 = {  //no file
            from: "persafssp@outlook.com",
            to: receiver,
            cc: CC,
            subject: subject,
            html: messageBody,
            //text: messageBody,
        }
        transporter.sendMail(options2, function (err,info){
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error" });
    
            }
            console.log(info.response);
        })
        return res.status(200).json({ message: "Email without attachment sent successfully" });

    } 

    const options = { 
        from: "persafssp@outlook.com",
        to: receiver,
        cc: CC,
        subject: subject,
        html: messageBody,
        // text: messageBody,
        attachments: [
            {
              filename: req.file.originalname,  // Set the filename based on your requirements
              content: req.file.buffer,          // Use the file content
              contentType: 'application/pdf',
            },
          ],  
    }

    transporter.sendMail(options, function (err,info){
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });

        }
        console.log(info.response);
    })
    return res.status(200).json({ message: "Email sent successfully." });


}

module.exports = {
    sendEmail,
}
