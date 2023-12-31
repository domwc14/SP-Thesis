//IF WORKS WITHOUT CHECKING IF CC exists, no for checker
import React, { useState } from 'react';

const SendEmailForm = () => {
  const default_message =`Dear Ma'am/Sir, Good day! <br>
Please refer to your SOA in the attached PDF. <br> <br>
  

<em>If payment has been made, kindly send us a copy of your deposit slip. As well as the corresponding BIR 2307 Form.</em> <br />&nbsp;<br />

PerSafS Marketing Corp <br>
Warehouse 3 Unit 6 PDC Commercial, Pilar Road cor. Rose Ave, <br>
Pilar Village, Las Pinas City <br>
Cellphone No. <strong>0917-174-7233</strong> <br>
Telephone No. <strong>027 004 5937</strong> <br> ` 
  const [receiver, setReceiver] = useState('');
  const [subject, setSubject] = useState('');
  const [CC, setCC] = useState('');
  const [messageBody, setMessageBody] = useState(default_message);
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('receiver', receiver);
    formData.append('subject', subject);
    formData.append('messageBody', messageBody);
    formData.append('attachment', attachment);
    formData.append('CC', CC);

    try {
        console.log(formData)
      const response = await fetch('/api/email/sendemail', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert(data.message); // You can handle the response as needed
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); // Handle errors
    }
  };

  return (
    <div>
      <h1 className="colored_title" >Send an Email</h1>
      {/* encType="multipart/form-data" */}
      <form encType="multipart/form-data" onSubmit={handleSubmit }>
        <label htmlFor="receiver">Receiver:</label>
        <input
          placeholder="Receiver's email here"
          style={{ width: '350px' }}
          type="text"
          id="receiver"
          name="receiver" 
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          required
        />

        <br />

        <label htmlFor="subject">Subject:</label>
        <input
          style={{ width: '350px' }}
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <label htmlFor="CC">CC:</label>
        <input
          placeholder="CC1,CC2,..."
          style={{ width: '350px' }}
          type="text"
          id="CC"
          name="CC"
          value={CC}
          onChange={(e) => setCC(e.target.value)}
        />
        

        <label htmlFor="messageBody">Message Body:</label>
        <textarea
          rows={16} // Adjust the number of rows as needed
          cols={80}
          id="messageBody"
          name="messageBody"
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
          required
        ></textarea>

        <br />

        <label htmlFor="attachment">Attachment (*pdf):</label>
        <input
          style={{ width: '300px' }}
          type="file"
          id="attachment"
          name="attachment"
          onChange={(e) => setAttachment(e.target.files[0])}
        />

        <br />

        <button style={{ height:'50px', width:'125px' }} type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default SendEmailForm;
