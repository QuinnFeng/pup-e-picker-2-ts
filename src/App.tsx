import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { DogsProvider, useDogs } from "./Components/DogsProvider";
import { Section } from "./Components/Section";

function DogContainer() {
  const { activeTab } = useDogs();
  const isDisplayDogForm = activeTab == "create-dog-form";
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {isDisplayDogForm ? <CreateDogForm /> : <Dogs />}
      </Section>
    </div>
  );
}

export function App() {
  return (
    <>
      <DogsProvider>
        <DogContainer />
      </DogsProvider>
    </>
  );
}
