import logo from './logo.svg';
// import {FloatingLabel, Form} from 'react-bootstrap'
import {useState} from 'react'
import './App.css';
import Select from './components/Select'
import PlayStoreForm from './components/PlayStoreForm';
import AppStoreForm from './components/AppStoreForm';






function App() {

  const [State, setstate] = useState('')

  const FormSelect=()=>{
    if(State==='Play Store'){
      return <PlayStoreForm />
    }
    else if(State==='App Store'){
      return <AppStoreForm />
    }
  }

  return (
    <div className="App container">
      <div>
        <Select state={State} setState={setstate} />
        {FormSelect()}
      </div>
    </div>
  );
}

export default App;
