import axios from 'axios';
import {useState, useEffect} from 'react'
import {InputGroup, Button, FormControl, handleData, Spinner} from 'react-bootstrap'
import Card from './Card/Card'



const AppStoreForm = () => {


    // STATES

    // loading animation while fetching data
    const [loading, setLoading] = useState(false); 
    // store app_id from form
    const [app_id, setApp_id] = useState('')
    // store app_name from form
    const [app_name, setApp_name] = useState('')
    // store card details fetched from api
    const [cardDetail, setCardDetail] = useState('');

    // useEffects 

    // update the value of appName and appId when card details are updated
    useEffect(() => {
        setApp_name(cardDetail.trackName)
        setApp_id(cardDetail.trackId)
    }, [cardDetail])



    // Functions

    // display the loader while fetching the data
    const displayLoader = ()=>{
        if(loading){
            return (
                <Button variant="primary" disabled>
                    <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    Loading...
                </Button>
            )
        }
        else{
            return (
                <Button type={"submit"} variant="outline-secondary" id="button-addon2">
                    Get info
                </Button>
            )
        }
    }

    // handel csrf token
    const set_CSRF_token = ()=>{ 
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
      }

      // shoten the description
    const handelDesp = (str)=>{
        let a = str.slice(0, 200)
        a = a + "...";
        return a;
    }

    // handle api requests
    const handleData = (e)=>{
        e.preventDefault();
        set_CSRF_token();
        setLoading(true);

        // API CONNECTION TO DJANGO.
        let jsonData = new FormData();
        jsonData.append("appName", app_name);
        jsonData.append("appId", app_id);
        axios.post('appStore/', jsonData).then((res)=>{
            let json = JSON.parse(res.data)
            json.description=handelDesp(json.description);
            setLoading(false)
            setCardDetail(json)
        }).catch((err)=>{
            setLoading(false)
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
                    {displayLoader()}
                </div>
            </form>
            <div className={"container"}>
                {cardDetail!=''? <Card reviews={cardDetail.userRatingCount} ratings={cardDetail.averageUserRating} downloads={" /"} description={cardDetail.description} imgSrc={cardDetail.artworkUrl512} appName={cardDetail.trackCensoredName} developerName={cardDetail.sellerName}/>: null}
            </div>
        </div>
    )
}

export default AppStoreForm
