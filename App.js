import React,{useEffect,useState} from 'react';
import {ethers} from 'ethers';
import abi from './abi.json';
import './App.css';


function App() {
  const[contract, setContract]=useState();
  const[valueCount, setValueCount]=useState(0);
  const[inputItem, setInputItem]=useState();
  const[inputListItem, setInputListItem]=useState();
  const[inputListItemRes, setInputListItemRes]=useState();

  const contractExecution=async()=>{
    const provider=new ethers.BrowserProvider(window.ethereum);
    const signer=await provider.getSigner()
    const contract=new ethers.Contract("0xfEa973F1C7869E5De1a88A7Bc13263C7Aa411caF",abi,signer)  //missing here
    setContract(contract)
  }

  const getValueCount=async()=>{
    if (contract){
      const res=await contract.count();
      const resNum=Number(res)
      setValueCount(resNum)
    }
  }
  useEffect(()=>{
    contractExecution();
    getValueCount();
  },[])

const handleChange=(e)=>{
  setInputItem(e.target.value)
}
const handleSubmit=async(e)=>{
  const res=await contract.getValue(inputItem);
}
const handleGetValueList=async()=>{
  const res=await contract.valueList(inputListItem-1);
  setInputListItemRes(res);
}
const handleValueList=(e)=>{
  setInputListItem(e.target.value);
}


  return (
    <div className="App">
      <button onClick={getValueCount} className='GVC'>Get the count</button>
      <h1>count of value:-{valueCount}</h1>
        <div>
          Enter the Input value
          <input onhange={handleChange}></input>
          <button onClick={handleSubmit} className='submit'>Submit</button>
        </div>
        <div className='buttons'>
          <input onChange={handleValueList}></input>
          <button onClick={handleGetValueList} className='HGVL'>Get valuelist</button>

          <h3>{inputListItemRes}</h3>  
        </div>  
    </div>
  );
}

export default App;
