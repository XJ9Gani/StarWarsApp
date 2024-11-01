import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import "../style/PlanetInfo.scss";

const PlanetPage = () => {
  const { id } = useParams<{ id: string }>();
  const [planet, setPlanet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any | null>(null);
  const [modalActive, setModalActive] = useState<boolean>(false);

  const openModal = () => {
    setModalActive(!modalActive);
    console.log(modalActive);
  };

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
        const data = await response.json();
        setPlanet(data);
        setFormData(data); // Initialize form values
      } catch (error) {
        console.error("Error fetching planet data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanet();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      setPlanet(formData);
      setModalActive(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!planet) {
    return <div>Planet not found</div>;
  }

  return (
    <>
      <div className={modalActive ? `blur` : `planetInfo`}>
        <div className="planetInfo__container">
          <div className="planetInfo__container--img"></div>
          <h1 className="planetInfo__container--name">{planet.name}</h1>
          <p>Population: {planet.population}</p>
          <p>Climate: {planet.climate}</p>
          <p>Diameter: {planet.diameter}</p>
          <p>Rotation Period: {planet.rotation_period}</p>
          <p>Surface Water: {planet.surface_water}</p>
          <p>Terrain: {planet.terrain}</p>
          <button onClick={openModal} className="planetInfo__container--btn">
            Edit
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className={modalActive ? `active` : `disactive`}
      >
        <h2>Edit Planet Info</h2>
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
          Population:
          <input
            type="number"
            name="population"
            value={formData?.population}
            onChange={handleChange}
          />
        </label>
        <label>
          Climate:
          <input
            type="text"
            name="climate"
            value={formData?.climate}
            onChange={handleChange}
          />
        </label>
        <label>
          Diameter:
          <input
            type="number"
            name="diameter"
            value={formData?.diameter}
            onChange={handleChange}
          />
        </label>
        <label>
          Rotation Period:
          <input
            type="number"
            name="rotation_period"
            value={formData?.rotation_period}
            onChange={handleChange}
          />
        </label>
        <label>
          Surface Water:
          <input
            type="number"
            name="surface_water"
            value={formData?.surface_water}
            onChange={handleChange}
          />
        </label>
        <label>
          Terrain:
          <input
            type="text"
            name="terrain"
            value={formData?.terrain}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="edit">
          Update Planet Info
        </button>
      </form>
    </>
  );
};

export default PlanetPage;
