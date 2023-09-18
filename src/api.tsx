import { Dog } from "./types";

const baseUrl = "http://localhost:3000";
const headers = {
  "Content-type": "application/json",
};
const getAllDogs = () => {
  return fetch(`${baseUrl}/dogs`).then((data) => data.json());
};

const postDog = ({ name, image, description, isFavorite }: Dog) => {
  return fetch(`${baseUrl}/dogs`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, image, description, isFavorite }),
  }).then((data) => data.json());
};
const deleteDogRequest = (id: number) => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "DELETE",
  }).then((data) => data.json());
};

const patchFavoriteForDog = (id: number, updatedDog: Partial<Dog>) => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updatedDog),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to update dog: ${response.status}`);
    }
    return response.json();
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
