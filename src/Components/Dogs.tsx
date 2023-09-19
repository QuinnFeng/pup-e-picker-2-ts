// Right now these dogs are constant, but in reality we should be getting these from our server

import { DogCard } from "./DogCard";
import { useDogs } from "./DogsProvider";
import { Dog } from "../types";
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () =>
  // no props allowed

  {
    const { dogs, deleteDog, toggleFavorite, isLoading } = useDogs();
    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {dogs?.map((dog: Dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => deleteDog(dog.id)}
            onHeartClick={() => toggleFavorite(dog.id, true)}
            onEmptyHeartClick={() => toggleFavorite(dog.id, false)}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  };
