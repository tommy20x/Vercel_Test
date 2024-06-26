'use client';

import axios from 'axios';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';

import { Stack, Button } from '@mui/material';

import { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';
import { DEV_HOST_API } from 'src/config-global';

import CreateType from '../create-type';
import CreateImage from '../create-image';
import CreateDialog from '../create-dialog';
import CreateDetails from '../create-details';
import CreateOptions from '../create-options';
import CreateGameFile from '../create-game-file';
import CreateRewardGlb from '../create-reward-glb';

const initialValues = {
  gameType: '',
  gameTitle: '',
  gameDescription: '',
  gameOptions: true,
  mainImage: null as File | null,
  secondImage: null as File | null,
  mainColor: 'primary',
  secondColor: 'primary',
  rewardGlb: null as File | null,
  backgroundGlb: null as File | null,
  gameFiles: [] as File[],
};

const validationSchema = Yup.object().shape({
  gameType: Yup.string().required('Game type is required'),
  gameTitle: Yup.string().required('Game title is required'),
  gameDescription: Yup.string().required('Game description is required'),
  gameOptions: Yup.boolean(),
  mainImage: Yup.mixed().required('Main image is required'),
  mainColor: Yup.string().required('Main color is required'),
  secondColor: Yup.string().required('Second color is required'),
  rewardGlb: Yup.mixed().required('Reward GLB is required'),
  backgroundGlb: Yup.mixed().required('Background GLB is required'),
  gameFiles: Yup.array()
    .of(Yup.mixed().required('Game file is required'))
    .length(4, 'Exactly 4 game files are required'),
});

const SubmitButton = () => {
  const { isValid, isSubmitting, dirty } = useFormikContext();
  return (
    <>
      <Stack direction="row" justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting || !isValid || !dirty}
          sx={{ fontSize: '20px', width: '250px' }}
        >
          Upload
        </Button>
      </Stack>
      <CreateDialog />
    </>
  );
};

export default function CreateView() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [userId, setUserId] = React.useState<string>('');

  useEffect(() => {
    setUserId(user?.uid);
  }, [user]);

  const onSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      console.log('Form Values:', values);
      const formData = new FormData();

      formData.append('userId', userId);
      formData.append('gameTitle', values.gameTitle);
      formData.append('gameType', values.gameType);
      formData.append('gameDescription', values.gameDescription);
      formData.append('gameOption', values.gameOptions.toString());
      formData.append('mainColor', values.mainColor);
      if (values.secondImage !== null) formData.append('secondColor', values.secondColor);
      if (values.mainImage) formData.append('mainImage', values.mainImage);
      if (values.secondImage) formData.append('secondImage', values.secondImage);
      if (values.rewardGlb) formData.append('rewardGlb', values.rewardGlb);
      if (values.backgroundGlb) formData.append('backgroundGlb', values.backgroundGlb);
      if (values.gameFiles.length > 0) {
        values.gameFiles.forEach((file, index) => {
          if (file.name.includes('.data')) formData.append(`gameFile0`, file);
          if (file.name.includes('.wasm')) formData.append(`gameFile1`, file);
          if (file.name.includes('.framework.js')) formData.append(`gameFile2`, file);
          if (file.name.includes('.loader.js')) formData.append(`gameFile3`, file);
        });
      }

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${DEV_HOST_API}${endpoints.games.upload}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };

      await axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      setSubmitting(false);
      router.push('/');
    } catch (e) {
      console.error('Submitting error :', e);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formik) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <Stack gap={5}>
            <CreateType />
            <CreateDetails />
            <CreateOptions />
            <CreateImage />
            <CreateRewardGlb />
            <CreateGameFile />
            <SubmitButton />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
