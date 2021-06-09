import {useState} from 'react'
import {InputGroup, Button, FormControl, handleData, Spinner} from 'react-bootstrap'
import axios from 'axios'

const WebKeywords = () => {

    // useStates
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false);

    // loader 
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

    // handle form data
    const handleData = (e)=>{
        e.preventDefault()
        setLoading(true)
        let json = new FormData()
        json.append("url", url)
        axios.post("webKeywords/", json).then((res)=>{
            setLoading(false);
            console.log(res)
        }).catch((err)=>{
            setLoading(false);
            console.log(err);
            alert(err)
        })

    }
    const handleUrl = (e)=>{
        let text = e.target.value
        setUrl(text)
    }



    return (
        <div>
            <form onSubmit={handleData} method="POST">
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Package Name"
                    aria-label="Package Name"
                    aria-describedby="basic-addon2"
                    value={url}
                    onChange={handleUrl}
                    />
                    {displayLoader()}
                    
                </InputGroup>
            </form>
            {/* <div className={"container"}> */}
                {/* {cardDetail!=''? <Card reviews={cardDetail.reviews} ratings={cardDetail.score} downloads={cardDetail.installs} description={cardDetail.description} imgSrc={cardDetail.icon} appName={cardDetail.title} developerName={cardDetail.developer}/>: null} */}
            {/* </div> */}
        </div>
    )
}

export default WebKeywords
