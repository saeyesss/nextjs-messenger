'use client';

import axios from 'axios';
import { HiPhoto, HiPaperAirplane } from 'react-icons/hi2';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useConversation from '@/app/hooks/useConversation';
import MessageInput from './MessageInput';
import { CldUploadButton } from 'next-cloudinary';

interface BodyProps {}

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });

    axios.post('/api/messages', { ...data, conversationId });
  };
  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className='py-4 bg-white px-4 flex border-t gap-2 lg:gap-4 items-center w-full'>
      <CldUploadButton
        onUpload={handleUpload}
        options={{ maxFiles: 1 }}
        uploadPreset='ft0lirx2'
      >
        <HiPhoto size={32} className='text-sky-500' />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center gap-2 lg:gap-4 w-full'
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />
        <button
          type='submit'
          className='
        rounded-full p-2 bg-sky-500 hover:bg-sky-600 transition cursor-pointer
        '
        >
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  );
};

export default Form;
