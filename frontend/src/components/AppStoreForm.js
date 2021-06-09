import axios from 'axios';
import {useState} from 'react'
import {InputGroup, Button, FormControl, handleData} from 'react-bootstrap'



const AppStoreForm = () => {


    // STATES

    // loading animation while fetching data
    const [loading, setLoading] = useState(false); 
    // store app_id from form
    const [app_id, setApp_id] = useState('')
    // store app_name from form
    const [app_name, setApp_name] = useState('')




    // Functions

    // handel csrf token
    const set_CSRF_token = ()=>{ 
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
      }

    // handle api requests
    const handleData = (e)=>{
        e.preventDefault();
        set_CSRF_token();
        setLoading(true);

        // var store = require("app-store-scraper");
        // store.app({id: 553834731}).then(console.log).catch(console.log);

        // API CONNECTION TO DJANGO.
        let jsonData = new FormData();
        jsonData.append("appName", app_name);
        jsonData.append("appId", app_id);
        axios.post('appStore/', jsonData).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            alert(err);
        })
    }

    const handleAppNameChange = (e)=>{
        setApp_name(e.target.value)
    }
    const handleAppIdChange = (e)=>{
        setApp_id(e.target.value)
    }


    return (
        <div>
            <form onSubmit={handleData} method="POST">


                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="App Name"
                    aria-label="App Name"
                    aria-describedby="basic-addon2"
                    value={app_name}
                    onChange={handleAppNameChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Application ID"
                    aria-label="Application ID"
                    aria-describedby="basic-addon2"
                    value={app_id}
                    onChange={handleAppIdChange}
                    />
                </InputGroup>
                <div className={"container"}>
                    <Button type={"submit"} variant="outline-secondary" id="button-addon2">
                        Get info
                    </Button>
                </div>


            </form>
        </div>
    )
}

export default AppStoreForm
