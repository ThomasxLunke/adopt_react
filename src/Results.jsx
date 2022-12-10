import Pet from "./Pet";

const Results = (props) => {

    return (
        <div className="search">
            {!props.petsList.length ?
            (
                <h1>No Pets Found</h1>
            ) : 
            (
                props.petsList.map((pet) => (
                    <Pet 
                        name={pet.name}
                        animal={pet.animal} 
                        breed={pet.breed} 
                        key={pet.id}
                        location={`${pet.city}, ${pet.state}`}
                        images={pet.images}
                        /> 
                ))
            )
            } 
        </div>
    );

}

export default Results