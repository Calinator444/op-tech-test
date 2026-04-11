import { SubmitHandler, useForm } from 'react-hook-form';
import { Stakeholder } from '../types/stakeholder';
import { FormInput, FormSubmit } from '@/components/Form';
import { stakeholderFormSchema } from '@/schemas/stakeholder';
import { createStakeholder } from '@/services/stakeholderService';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';


import { toast } from 'react-toastify';

const StakeholderForm = () => {
  const { register, handleSubmit, formState } = useForm<Omit<Stakeholder, 'id' | 'createdAt' >>({
    mode: "onBlur",
    resolver: zodResolver(stakeholderFormSchema),
  });
  
  const navigate = useNavigate();

  const { errors, isValidating, isSubmitting } = formState;

  const onSubmit: SubmitHandler<Omit<Stakeholder, 'id' | 'createdAt'>> = async (data) => {
    try{
      await createStakeholder(data);
      toast.success('Stakeholder created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create stakeholder');
    }
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
          {...register('firstName')}
          type="text"
          error={errors.firstName?.message}
        />

        <FormInput
          label="Last Name"
          {...register('lastName')}
          type="text"
          error={errors.lastName?.message}
        />

        <FormInput
          label="Email"
          {...register('email')}
          placeholder="example@gmail.com"
          error={errors.email?.message}
        />
        <FormInput
          {...register('role')}
          label="Role"
          type="text"
          error={errors.role?.message}
        />
        <FormInput
          {...register('organisation')}
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
