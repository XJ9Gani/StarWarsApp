import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const EntityDetailPage = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Entity Detail: {id}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} placeholder="Name" />
        <button type="submit">Save</button>
      </form>
      <Link to="/char">Back</Link>
    </div>
  );
};

export default EntityDetailPage;
