import React from 'react'
import './card.css'

const Card = (props) => {
    return (
        <div className={"card-body border border-3 mx-5 my-5"}>
            <div>
                <img className={"icon mt-3"} src={props.imgSrc}></img>
            </div>
            <div className={"card-header"}>
                <h3 className={"app-name"}>{props.appName}</h3>
                <small className={"developer-name"}>{props.developerName}</small>
            </div>
            <div className={"text-center mt-3 mr-5 ml-5 px-5"}>
                <p className={""}>{props.description}</p>
            </div>
            <div className={"footer row"}>
                <small className={"download col"}>Downloads:- {props.downloads}</small>
                <small className={"rating col"}>Rating:- {props.ratings}</small>
                <small className={"reviews col"}>reviews:- {props.reviews}</small>
            </div>
        </div>
    )
}

export default Card
