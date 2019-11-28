import React from 'react';

export default function Column(props){
  props.Column.push('Edit')
    props.Column.push('Delete')
  
    return(
  
      <React.Fragment>
        <thead>
        <tr>
          {
            props.Column.map(item=>{
              return (
                <React.Fragment key={item}>
                  <th>
                    {item}
                  </th>
                </React.Fragment>
              )
            })
          }
        </tr>
        </thead>
      </React.Fragment>
    )
  }
