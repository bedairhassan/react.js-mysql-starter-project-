import { useEffect, useState } from 'react';
import * as React from 'react';

import Service from './Service'
import Column from '../templates/Column'

export default function Root(props) {

  const [getData, setData] = useState(['empty data'])

  const [coursecode, setcoursecode] = useState('')
  const [preqcode, setpreqcode] = useState('')
  
  const [Warning, setWarning] = useState('null')

  const [allow, setAllow] = useState(true)

  // void function 
  let ReadAll = () => {
    Service.ReadAll().then(
      response => {

        setData(response.data)

        if (allow === true) {
          console.log(response.data)
          setAllow(false)
        }
      }
    ).catch(
      (error) => { console.log('this is error', error) }
    )
  }


  useEffect(() => {
    ReadAll()
  })

  let Delete = (id) => {
    Service.DeleteById(id).then(() => { alert('Deleted Record') })
  }

  let Edit = (item) => {

    const { coursecode, preqcode} = item

    setcoursecode(coursecode)
    setpreqcode(preqcode)
   
  }

  let CheckEmpty = () => {

    let array = []
    // your edit here
    array.push(coursecode === null || coursecode === '')
    array.push(preqcode === '' || preqcode === null)
    
    for (let i = 0; i < array.length; i++) {

      if (array[i] === true) {
        setWarning('One or more fields are empty')
        return true
      }
    }

    return false
  }

  

  return (

    <>
      <h6>Warning is: {Warning}</h6>
      <h1>This is DoctorTeachCourse</h1>
      <React.Fragment>
        <table border='1%'>
          <Column Column={['coursecode', 'preqcode']} />
          <tbody>

            {getData.map(item => {

    const { coursecode, preqcode} = item

              return (
                <>
                  <tr>
                    <td>{coursecode}</td>
                    <td>{preqcode}</td>
                    
                    <td><button id='edit-top' onClick={() => {

                      Edit(item)
                      document.getElementById('add-bottom').disabled = true
                    }


                    }>Edit</button></td>
                    <td><button onClick={() => Delete(coursecode)}>Delete</button></td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>

        <h2>coursecode:</h2>
        <input value={coursecode} onChange={(e) => { setcoursecode(e.target.value) }} />

        <h2>preqcode:</h2>
        <input value={preqcode} onChange={(e) => { setpreqcode(e.target.value) }} />

        <br /> <br />
        <button id='add-bottom' onClick={() => {

          Service.POST({
            
            preqcode,
            coursecode,
            
          }).then(alert('added record'));

        }}>Add Record</button>

        <button id='edit-bottom' onClick={() => {

          // validation
          if (CheckEmpty()) {
            return
          }

          Service.PUT({
            
            coursecode,
            preqcode,
            
          }, coursecode).then(alert('edited record'));

          document.getElementById('add-bottom').disabled = false
          setWarning('null')

        }}>Edit</button>
      </React.Fragment>
    </>
  )
}