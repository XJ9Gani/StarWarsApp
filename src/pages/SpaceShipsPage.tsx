import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import "../style/ShipInfo.scss";

const SpaceShipsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ship, setShip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any | null>(null);
  const [modalActive, setModalActive] = useState<boolean>(false);

  const openModal = () => {
    setModalActive(!modalActive);
    console.log(modalActive);
  };

  useEffect(() => {
    const fetchStarship = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
        const data = await response.json();
        setShip(data);
        setFormData(data); // Initialize form values
      } catch (error) {
        console.error("Error fetching starship data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarship();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      setShip(formData);
      setModalActive(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!ship) {
    return <div>Starship not found</div>;
  }

  return (
    <>
      <div className={modalActive ? `blur` : `shipInfo`}>
        <div className="shipInfo__container">
          <div className="shipInfo__container--img"></div>
          <h1 className="shipInfo__container--name">{ship.name}</h1>
          <p>Model: {ship.model}</p>
          <p>Max passengers count: {ship.passengers}</p>
          <p>Starship class: {ship.starship_class}</p>
          <p>Consumables: {ship.consumables}</p>
          <p>Cost in credits: {ship.cost_in_credits}</p>
          <button onClick={openModal} className="shipInfo__container--btn">
            Edit
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className={modalActive ? `active` : `disactive`}
      >
        <h2>Edit Starship Info</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={formData?.model}
            onChange={handleChange}
          />
        </label>
        <label>
          Max Passengers:
          <input
            type="number"
            name="passengers"
            value={formData?.passengers}
            onChange={handleChange}
          />
        </label>
        <label>
          Starship Class:
          <input
            type="text"
            name="starship_class"
            value={formData?.starship_class}
            onChange={handleChange}
          />
        </label>
        <label>
          Consumables:
          <input
            type="text"
            name="consumables"
            value={formData?.consumables}
            onChange={handleChange}
          />
        </label>
        <label>
          Cost in Credits:
          <input
            type="number"
            name="cost_in_credits"
            value={formData?.cost_in_credits}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="edit">
          Update Starship Info
        </button>
      </form>
    </>
  );
};

export default SpaceShipsPage;
