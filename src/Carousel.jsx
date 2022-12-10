import { useState } from "react"


const Carousel = ({images}) => {

    const [index,setIndex] = useState(0)

    if (!images.length)
    {
        images.push("http://pets-images.dev-apis.com/pets/none.jpg")
    }

    return (
        <div className="carousel">
        <img src={images[index]} alt="pet thumbnail" />
            <div className="carousel-smaller">
                {images.map((pet,i) => (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <img 
                        key={pet}
                        src={pet}
                        alt="pet thumbnail"
                        onClick={() => {
                            setIndex(i)
                        }}
                        onKeyDown={() => {
                            setIndex(i)
                        }}
                        className={index===i ? "active" : ""}
                    />
                    
                ))}
            </div>
        </div>
    )
}

export default Carousel