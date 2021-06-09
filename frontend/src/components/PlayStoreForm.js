import {useState} from 'react'
import {InputGroup, Button, FormControl, handleData, Spinner} from 'react-bootstrap'
import axios from 'axios'
import Card from './Card/Card'






const PlayStoreForm = () => {

    const [packageName, setPackageName] = useState('');
    const [cardDetail, setCardDetail] = useState('');
    const [loading, setLoading] = useState(false);


    const handelDesp = (str)=>{
        let a = str.slice(0, 200)
        a = a + "...";
        return a;
    }

    const set_CSRF_token = ()=>{
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
      }
    const handleData = (e)=>{
            e.preventDefault();
            set_CSRF_token();
            setLoading(true);
            let jsonData = new FormData();
            jsonData.append("packageName", packageName)
            axios.post("", jsonData).then((res)=>{
                let json = JSON.parse(res.data)
                json.description=handelDesp(json.description);
                setCardDetail(json)
                setLoading(false);
            }).catch((err)=>{
                alert(err);
                setLoading(false);
            }) 
    }


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

    const handlePackageName = (e)=>{
        let val = e.target.value;
        let new_val = '';
        for(let i=0; i<val.length; i++){
            if(val[i]!=' '){
                new_val = new_val+val[i];
            }
        }
        setPackageName(new_val);
    }

    return (
        <div>
            <form onSubmit={handleData} method="POST">
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Package Name"
                    aria-label="Package Name"
                    aria-describedby="basic-addon2"
                    value={packageName}
                    onChange={handlePackageName}
                    />
                    {displayLoader()}
                    
                </InputGroup>
            </form>
            <div className={"container"}>
                {cardDetail!=''? <Card reviews={cardDetail.reviews} ratings={cardDetail.score} downloads={cardDetail.installs} description={cardDetail.description} imgSrc={cardDetail.icon} appName={cardDetail.title} developerName={cardDetail.developer}/>: null}
            </div>
        </div>
    )
}

export default PlayStoreForm
