import React from 'react'
import GeneralChart from './GeneralChart';
import StatusChart from './StatusChart';

function TopChart() {
    return (
        <div className='row'>
            <div className='col-lg-4 mx-auto'>
                <GeneralChart/>
            </div>
            <div className='col-lg-4 mx-auto'>
                <StatusChart/>
            </div>
            
        </div>
    )
}

export default TopChart
