import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel"
import ErrorBoundary from "./ErrorBoundary";

const Details = (/*props*/) => {
  //récupère l'id contenu dans BrowserRouter  
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  //on ne peut pas mettre un await (pour attendre fetchPet) car Details{...} n'est pas async
  //mais il existe .isLoading
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];
  console.log(pet)

  return (
        <div className="details">
        <Carousel images={pet.images}/>
        <div>
            <h1>{pet.name}</h1>
            <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
            <button>Adopt {pet.name}</button>
            <p>{pet.description}</p>
        </div>
        </div>
  );
};


function DetailsErrorBoundary(/*props*/) {
    /*
    return (
        <ErrorBoundary>
            <Details {...props}/>      --> to pass all the props to details  
        </ErrorBoundary>
    )
    */
    return (
        <ErrorBoundary>
            <Details/> 
        </ErrorBoundary>
    )
}

export default DetailsErrorBoundary;