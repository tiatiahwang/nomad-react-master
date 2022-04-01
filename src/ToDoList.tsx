import { useForm } from 'react-hook-form';

const ToDoList = () => {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register('email')} placeholder="email" />
        <input {...register('first_name')} placeholder="first name" />
        <input {...register('last_name')} placeholder="last name" />
        <input {...register('username')} placeholder="username" />
        <input {...register('password')} placeholder="password" />
        <input {...register('password1')} placeholder="password1" />
        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
