import React, { useEffect, useState } from 'react' 
import mqtt from 'mqtt'
import { awsPublicIp, emqxURI } from '../../utils/emqx';
import { useNavigate } from 'react-router-dom';

function MQTT() {
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const TOPIC = 'test/topic' 
    const ip = emqxURI;  
    const navigate = useNavigate();  
    const connectURL = `ws://${ip}:8085/mqtt`

    useEffect(() => {
        const client = mqtt.connect(connectURL); 

        client.on('connect', () => {
            console.log('Connected to MQTT Broker');
            client.subscribe(TOPIC);
        }) 

        client.on('message', (topic, message) => {
            setReceivedMessages(prevMessages => [...prevMessages, message.toString()]);
          }); 
          
        return () => {
            client.end()
        }

    }, []) 

    function sendMessage () { 
        console.log('send function worked')
        const client = mqtt.connect(connectURL);  
        client.publish(TOPIC, message) 
        setMessage('')
    }

  return (
    <>
    <div className="font-bold text-gray-200  w-full flex h-screen">
        <div className="mx-auto my-auto">

        <div>
            <h1>MQTT Dashboard</h1>
            <input
            type="text" 
            className="text-black font-normal p-4 rounded xl"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <button 
            className="bg-lime-400 p-4 rounded-xl mx-2 text-black hover:bg-lime-500 active:bg-lime-600"
            onClick={sendMessage}>Send Message</button>
            <h2>Received Messages</h2>
            <ul>
            {receivedMessages.map((msg, index) => (
                <li className="bg-gray-200 text-gray-200 w-1/2 font-semibold
                rounded-md text-center bg-opacity-20 mt-2
                " key={index}>{msg}</li>
            ))}
            </ul>
        </div>

        </div>
    </div>
    <div className="flex justify-center">
    <button
    onClick={() => navigate('/')}
    className="bg-gray-600 zoom-hover mb-5 hover:bg-gray-500 active:bg-gray-700
    text-white px-2 py-1 rounded-md">
    <small>Home</small>
    </button>
    </div>
    </>
  )
}

export default MQTT