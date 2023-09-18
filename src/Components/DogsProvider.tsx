import { ReactNode, useEffect, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

type ActiveTab = "favorite" | "unfavorite" | "all-dogs" | "create-dog-form";

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all-dogs");
  const favoriteCounts = dogs.filter(
    (dog: Dog) => dog.isFavorite === true
  ).length;
  const unfavoriteCounts = dogs.length - favoriteCounts;

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = () => {
    Requests.getAllDogs()
      .then((dogs: Array<Dog>) => setDogs(dogs))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const toggleFavorite = (dogId: number, isFavorite: boolean) => {
    const updatedIsFavorite = !isFavorite;

    setDogs(
      dogs.map((dog) =>
        dog.id === dogId ? { ...dog, isFavorite: updatedIsFavorite } : dog
      )
    );

    Requests.patchFavoriteForDog(dogId, { isFavorite: updatedIsFavorite }).then(
      (response) => {
        if (!response.ok) {
          setDogs(dogs);
        }
      }
    );
  };
};
