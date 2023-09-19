import { FormEvent, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "./DogsProvider";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const { createDog, isLoading } = useDogs();

    const reset = () => {
      setName("");
      setDescription("");
      setSelectedImage(dogPictures.BlueHeeler);
    };

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createDog(name, description, selectedImage);
      reset();
    };
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          formSubmitHandler(e);
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          id="name"
          type="text"
          value={name}
          disabled={isLoading}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="description"
          cols={80}
          rows={10}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
          value={selectedImage}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
