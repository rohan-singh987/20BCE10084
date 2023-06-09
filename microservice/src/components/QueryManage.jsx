import React, { useState } from 'react';
import axios from 'axios';

const QueryManage = () => {
    const [urls, setUrls] = useState([]);
    const [numbers, setNumbers] = useState([]);

    const fetchNumbers = async () => {

        try {
            const response = await axios.get({
                url: urls
            });
            const data = response.data;
            setNumbers(data);
        } catch (error) {
            console.error('Error fetching numbers:', error);
        }
    };

    const URLinput = (event) => {
        const inputValue = event.target.value;
        const newUrls = inputValue
            .split('&url=')
            .map(url => url.replace('http://localhost:3001/numbers?url=', ''));

        setUrls(newUrls);
    };
    return (
        <div><div className='flex justify-center h-screen items-center bg-gradient-to-r from-[#cebff3] via-[#c4cdd9e8] to-[#ebf5b3de] '>
            <div className=' '>
                <h1 className='font-bold text-center text-2xl'> HTTP MicroService Number Management App</h1>
                <div className='flex flex-col'>
                    <textarea
                        rows={4}
                        cols={50}
                        placeholder="Enter URLs"
                        className='border-solid border-4'
                        onChange={URLinput}
                    />
                </div>
                <button className='border-2 border-black bg-gradient-to-r from-[#FFCDA8] via-[#ebf5b3de] to-[#FFCDA8]  mx-60 my-5' onClick={fetchNumbers}>Fetch Numbers</button>
                <div>
                    {numbers.length > 0 && (
                        <ul>
                            {numbers.map((number, index) => (
                                <li key={index}>{number}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
        </div>
    )
}

export default QueryManage