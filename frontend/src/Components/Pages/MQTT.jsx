import React, { useEffect, useState } from 'react' 
import mqtt from 'mqtt'
import { emqxURI } from '../../utils/emqx';

function MQTT() {
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const TOPIC = 'python/mqtt' 
    const ip = emqxURI; 

    useEffect(() => {
        const client = mqtt.connect(`ws://${ip}:8083/mqtt`); 

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
        const client = mqtt.connect(`ws://${ip}:8083/mqtt`);  
        client.publish(TOPIC, message) 
        setMessage('')
    }

  return (
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
                <li key={index}>{msg}</li>
            ))}
            </ul>
        </div>

        </div>
    </div>
  )
}

export default MQTT