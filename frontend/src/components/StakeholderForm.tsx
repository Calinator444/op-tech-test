import { SubmitHandler, useForm } from 'react-hook-form';
import { Stakeholder } from '../types/stakeholder';
import { FormInput, FormSubmit } from '@/components/Form';
import { stakeholderSchema } from '@/schemas/stakeholder';
import { getEmailExists } from '@/services/stakeholderService';
import { useNavigate } from 'react-router-dom';


import { toast } from 'react-toastify';

const StakeholderForm = () => {
  const { register, handleSubmit, formState } = useForm<Stakeholder>({
    mode: "onBlur"
  });
  
  const navigate = useNavigate();

  const { errors, isValidating, isSubmitting } = formState;

  const onSubmit: SubmitHandler<Stakeholder> = (data) => {
    console.log('data', data);
    toast.success('Stakeholder created successfully!');
    navigate('/');
  };

  return (
    <>
      {' '}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="stakeholder-form"
      >
        <FormInput
          {...register('title')}
          label="Title"
          type="text"
          error={errors.title?.message}
        />
        <FormInput
          label="First Name"
          {...register('firstName', { required: 'First name is required' })}
          type="text"
          error={errors.firstName?.message}
        />

        <FormInput
          label="Last Name"
          {...register('lastName', { required: 'Last name is required' })}
          type="text"
          error={errors.lastName?.message}
        />

        <FormInput
          label="Email"
          {...register('email', {
            required: 'Email is required',
            validate: async (value) => {
              const result = stakeholderSchema
                .pick({ email: true })
                .safeParse({ email: value });
              if (!result.success) {
                return 'Invalid email address';
              }
              const emailExists = await getEmailExists(value);
              if (emailExists) {
                return 'Email already taken';
              }
            },
          })}
          placeholder="example@gmail.com"
          error={errors.email?.message}
        />
        <FormInput
          {...register('role', { required: 'Role is required' })}
          label="Role"
          type="text"
          error={errors.role?.message}
        />
        <FormInput
          {...register('organisation', {
            required: 'Organisation is required',
          })}
          label="Organisation"
          type="text"
          error={errors.organisation?.message}
        />
        <FormSubmit loading={isValidating || isSubmitting } disabled={isValidating || isSubmitting } />
      </form>
    </>
  );
};

export default StakeholderForm;
