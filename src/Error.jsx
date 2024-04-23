
import React, { useState } from 'react';



function Error({ errorStatus }) {  
    return (
        <div>
            <div className="status">❗{errorStatus}</div>
        </div>
    )
}

export default Error;