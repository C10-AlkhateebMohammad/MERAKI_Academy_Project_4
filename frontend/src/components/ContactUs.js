import React, { useState, useRef } from 'react';
import '../App.css';
import emailjs from '@emailjs/browser';

function ContactUs() {
    const [showAlert, setShowAlert] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_88z8wpi', 'template_1zhew1y', form.current, {
            publicKey: 'N-s4SJwnl20wrDvHq',
          })
          .then(
            () => {
              console.log('SUCCESS!');
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000); 
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
      };

    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
            </form>
            {showAlert && (
                <div className="alert">Message sent successfully!</div>
            )}
        </div>
    );
}

export default ContactUs;
