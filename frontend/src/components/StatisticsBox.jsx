/* eslint-disable react/prop-types */
import React from 'react'

// eslint-disable-next-line react/prop-types
const StatisticsBox = ({data}) => {
  return (
    <div>
      <h2>Statistics</h2>
      <div>
        {data.map((stat, index) => (
          <p key={index}>
            {stat._id} : {stat.count}
          </p>
        ))}
      </div>
    </div>
    
  )
}

export default StatisticsBox;