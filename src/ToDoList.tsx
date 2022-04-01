import { useForm } from 'react-hook-form';

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: '@gmail.com',
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'Password are not same' },
        { shouldFocus: true },
      );
    }
  };

  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
              message: 'only gmail allowed',
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register('firstName', {
            required: 'write here',
            validate: {
              noHello: (value) =>
                value.includes('hello') ? 'no hello allowed' : true,
            },
          })}
          placeholder="first name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register('lastName', { required: 'write here' })}
          placeholder="last name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register('username', { required: 'write here', minLength: 5 })}
          placeholder="username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register('password', {
            required: 'write here',
            minLength: 8,
          })}
          placeholder="password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register('password1', {
            required: 'password is required',
            minLength: {
              value: 8,
              message: 'Your password is too short',
            },
          })}
          placeholder="password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
};

export default ToDoList;
