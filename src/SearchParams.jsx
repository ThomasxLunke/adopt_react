import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
 

const SearchParams = () => {
    const [requestParams ,setRequestParams] = useState ({
        location : "",
        animal : "",
        breed :"",
    })
    const [animal, setAnimal] = useState("")
    const [breeds] = useBreedList(animal)

    const results = useQuery(["search",requestParams],fetchSearch)
    const pets = results?.data?.pets ?? [];

    return (
        <div className="search-params">
            <form onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.target)
                const obj = {
                    animal: formData.get("animal") ?? "",
                    location: formData.get("location") ?? "",
                    breed: formData.get("breed") ?? "",
                }
                setRequestParams(obj)
            }}>
                <label htmlFor="location">
                    Location
                    <input
                        name="location"
                        id="location"
                        placeholder="Location" />
                </label>
                <label htmlFor="animal">
                    Animal 
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value)
                        }}
                    >
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </select>
                </label>

                <label htmlFor="breeds">
                    Breeds
                    <select
                        id="breeds"
                        disabled={breeds.length === 0}
                        name="breed"
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