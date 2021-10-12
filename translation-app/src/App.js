import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOuput] = useState("");

  const translate = () => {

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://translate.mentality.rip/translate', params, {
      headers:{
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(result => {
      console.log(result.data)
      setOuput(result.data.translatedText)
    })
  }

  useEffect(() => {
    axios.get(`https://translate.mentality.rip/languages`,
    {headers:{
      'accept': 'application/json'
    }}).then(result=>{
      console.log(result.data)
      setOptions(result.data)
    })
  },[])

  return (
    <div className="App">
      <div>
        From ({from}) :
        <select onChange={e => setFrom(e.target.value)}>
          {options.map(opt=> <option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
        To ({to}) :
        <select onChange={e => setTo(e.target.value)}>          
          {options.map(opt=> <option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
      </div>
      
      <div>
        <textarea cols="50" rows="8" onInput={(e) => setInput(e.target.value)}></textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" value={output.toLowerCase()}></textarea>
      </div>
      <div>
        <button onClick={e => translate()}>Translate</button>
      </div>

    </div>
  );
}

export default App;

