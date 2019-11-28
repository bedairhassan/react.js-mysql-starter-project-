import { useEffect, useState } from 'react';
import * as React from 'react';

import Service from './Service'
import Column from './Column'

export default function Root(props) {

  const [getData, setData] = useState(['empty data'])
  
  const [id, setid] = useState('')
  const [thisint, setthisint] = useState('')
  const [thischar, setthischar] = useState('')
  const [thisfloat, setthisfloat] = useState('')
  const [thisboolean, setthisboolean] = useState('')

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
    Service.DeleteById(id).then(() => { console.log('deleted record') })
  }

  let Edit = (item) => {

    const { id, thisint, thischar, thisfloat } = item

    setid(id)
    setthisint(thisint)
    setthischar(thischar)
    setthisfloat(thisfloat)
    setthisboolean(thisboolean)
  }

  let CheckEmpty = () => {

    let array = []
    // your edit here
    array.push(id === null || id === '')
    array.push(thisint === '' || thisint === null)
    array.push(thisfloat === '' || thisfloat === null)
    array.push(thischar === '' || thischar === null)
    array.push(thisboolean === '' || thisboolean === null)


    for (let i = 0; i < array.length; i++) {

      if (array[i] === true) {
        setWarning('One or more fields are empty')
        return true
      }
    }

    return false
  }

  function ThisBooleanDisplay(props){

    if(props.thisboolean){
      return (
        <td>true</td>
      )
    }
    else{
      return(
        <td>false</td>
      )
    }
  }


  return (

    <>
    <a href={'https://drive.google.com/open?id=1G3raAJoyY7_bj5M1kfPH_49swr37vAAd'} onClick={
      ()=>{
        alert('💣 BOM')
      }
    }>Here is the link, Stacy</a>
      <h6>Warning is: {Warning}</h6>
      <h1>Problems with Mapping is now fixed</h1>
      <React.Fragment>
        <table border='1%'>
          <Column Column={['id', 'thisint', 'thischar', 'thisfloat','thisboolean']} />
          <tbody>

            {getData.map(item => {

              const { id, thisint, thischar, thisfloat,thisboolean } = item

              return (
                <>
                  <tr>
                    <td>{id}</td>
                    <td>{thisint}</td>
                    <td>{thischar}</td>
                    <td>{thisfloat}</td>
                    <ThisBooleanDisplay thisboolean={thisboolean}/>


                    <td><button id='edit-top' onClick={() => {

                      Edit(item)
                      document.getElementById('add-bottom').disabled = true
                    }


                    }>Edit</button></td>
                    <td><button onClick={() => Delete(id)}>Delete</button></td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>

        <h2>id:</h2>
        <input value={id} onChange={(e) => { setid(e.target.value) }} />

        <h2>thisint:</h2>
        <input value={thisint} onChange={(e) => { setthisint(e.target.value) }} />

        <h2>thisfloat:</h2>
        <input value={thisfloat} onChange={(e) => { setthisfloat(e.target.value) }} />

        <h2>thischar:</h2>
        <input value={thischar} onChange={(e) => { setthischar(e.target.value) }} />

        <h2>thisboolean:</h2>
        <input placeholder={'true/false'} value={thisboolean} onChange={(e) => { setthisboolean(e.target.value) }} />

        <br /> <br />
        <button id='add-bottom' onClick={() => {

          Service.POST({

            thisint,
            id,
            thisfloat,
            thischar,
            thisboolean

          }).then(alert('added record'));

        }}>Add Record</button>

        <button id='edit-bottom' onClick={() => {

          // validation
          if (CheckEmpty()) {
            return
          }

          Service.PUT({

            id,
            thisint,
            thischar,
            thisfloat,
            thisboolean

          }, id).then(alert('edited record'));

          document.getElementById('add-bottom').disabled = false
          setWarning('null')

        }}>Edit</button>
      </React.Fragment>
    </>
  )
}