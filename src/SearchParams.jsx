import { useState, useEffect } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
 

const SearchParams = () => {
    const [location, setLocation] = useState("")
    const [animal, setAnimal] = useState("")
    const [breed, setBreed] = useState("")
    const [pets, setPets] = useState([])
    const [breeds, status] = useBreedList(animal)

    useEffect(() => {
        requestPets();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets() {
        //console.log(`${animal} ${location} ${breed}`)
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        )
        const json = await res.json();
        setPets(json.pets)
    }


    return (
        <div className="search-params">
            <form onSubmit={e => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input
                        onChange={(e) => setLocation(e.target.value)}
                        id="location"
                        value={location}
                        placeholder="Location" />
                </label>
                <label htmlFor="animal">
                    Animal 
                    <select
                        id="animal"
                        value={animal}
                        onChange={e => {
                            setAnimal(e.target.value)
                            setBreed("")
                        }}
                    >
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </select>
                </label>

                <label htmlFor="breeds">
                    Breeds {status}
                    <select
                        id="breeds"
                        disabled={breeds.length === 0}
                        value={breed}
                        onChange={e => {
                            setBreed(e.target.value)
                        }}
                    >
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>

            <Results petsList={pets} />                 

        </div>
    );
};

export default SearchParams;