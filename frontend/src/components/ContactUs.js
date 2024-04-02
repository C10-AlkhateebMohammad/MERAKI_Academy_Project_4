import axios from 'axios'
import React, { useState } from 'react'
import '../App.css'
import { create } from '@mui/material/styles/createTransitions'
function ContactUs() {
    const [addContact, setContact] = useState()
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const createContactUs = () => {
        axios.post('http://localhost:5000/contact/creat', { email, subject, message, phoneNumber })
            .then((res) => {
                setContact(res.data)
                alert('Message sent successfully!');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <form className="contact-form" onSubmit={createContactUs}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email"  onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject"  onChange={(e) => setSubject(e.target.value)} required />

                <label htmlFor="message">Message:</label>
                <textarea id="message"  onChange={(e) => setMessage(e.target.value)} required></textarea>

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber"  onChange={(e) => setPhoneNumber(e.target.value)} />

                <button type="submit" onClick={()=>{
                    createContactUs()
                }}>Submit</button>
            </form>
            
        </div>
    )
}

export default ContactUs;