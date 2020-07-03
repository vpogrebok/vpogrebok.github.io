import React, {useState} from "react"
import "./Slide.css"

const Slide = ({src, content}) => {
    const [height, setHeight] = useState("22px");
    const [overflow, setOverflow] = useState("hidden");

    const changeVisibilityText = () => {
        content.length > 100 && height === "22px"
            ? setOverflow("visible") || setHeight("100%")
            : setOverflow("hidden") || setHeight("22px")
    }
    
    return(
        <div className="slide">
            <div>
            <img className="slide__img" src={src} alt="Изображение природы" />
            <p className="slide__content" style={{height, overflow}}>{content}</p>
            </div>
            <button className="slide__button" type="button" onClick={changeVisibilityText}>Читать далee</button>
        </div>
    )
}

export default Slide;