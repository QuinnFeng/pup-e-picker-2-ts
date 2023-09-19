import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type DogContextType = {
  dogs: Dog[];
  toggleFavorite: (dogId: number, isFavorite: boolean) => void;
  favoriteCounts: number;
  unfavoriteCounts: number;
  activeTab: ActiveTab;
  setActiveTab: (activeTab: ActiveTab) => void;
  deleteDog: (id: number) => void;
  createDog: (name: string, description: string, image: string) => void;
  isLoading: boolean;
};

const DogsContext = createContext<DogContextType>({} as DogContextType);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all-dogs");
  const favoriteCounts = dogs.filter(
    (dog: Dog) => dog.isFavorite === true
  ).length;
  const unfavoriteCounts = dogs.length - favoriteCounts;
  const filteredDogs = (() => {
    if (activeTab === "create-dog-form" || activeTab === "all-dogs")
      return dogs;
    return dogs.filter((dog) => {
      return dog.isFavorite === (activeTab === "favorite");
    });
  })();

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

  const deleteDog = (id: number) => {
    setDogs(dogs.filter((dog) => dog.id !== id));
    Requests.deleteDogRequest(id).then((response) => {
      if (!response?.ok) {
        setDogs(dogs);
      } else return;
    });
  };

  const createDog = (name: string, description: string, image: string) => {
    const dog: Partial<Dog> = { name, description, image, isFavorite: false };
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => toast.success(`created dog ${name}`))
      .finally(() => {
        setIsLoading(false);
      });
    fetchDogs();
  };

  return (
    <DogsContext.Provider
      value={{
        dogs: filteredDogs,
        toggleFavorite,
        favoriteCounts,
        unfavoriteCounts,
        activeTab,
        setActiveTab,
        deleteDog,
        createDog,
        isLoading,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
