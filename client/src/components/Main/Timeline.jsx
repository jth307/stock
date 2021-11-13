
import React from 'react';

function Timeline({interval, currentInterval, changeInterval}) {

  const intervalClass = interval === currentInterval? "timeline-button active" : "timeline-button";

  return (
   <div
   onClick={()=> (changeInterval({interval}))}
   className={intervalClass}>
     {interval}
   </div>
  )
}

export default Timeline;
