import PromptCardList from "./PromptCardList";

const UserProfile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}'s Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

        <PromptCardList
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
    </section>
  );
};

export default UserProfile;
