'use client';

import React from 'react';
import { useFormikContext } from 'formik';

import { Stack } from '@mui/material';

import { CustomUpload } from 'src/components/custom-upload';
import { SmallRequiredTypography } from 'src/components/custom-typo/custom-typo';

export default function CreateRewardGlb() {
  const [mainFile, setMainFile] = React.useState<File | string | null>(null);
  const [secondFile, setSecondFile] = React.useState<File | string | null>(null);

  const accept = { 'model/gltf-binary': ['.glb', '.gltf'] };

  const { setFieldValue } = useFormikContext();

  const handleDropMainFile = React.useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setMainFile(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );
        setFieldValue('rewardGlb', newFile);
      }
    },
    [setFieldValue]
  );

  const handleDropSecondFile = React.useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setSecondFile(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );
        setFieldValue('backgroundGlb', newFile);
      }
    },
    [setFieldValue]
  );

  return (
    <Stack direction="row" flexWrap="wrap" gap={7}>
      <Stack direction="row">
        <SmallRequiredTypography title="UPLOAD REWARD GLB" />
        <CustomUpload
          file={mainFile}
          onDrop={handleDropMainFile}
          onDelete={() => {
            setMainFile(null);
            setFieldValue('rewardGlb', null);
          }}
          accept={accept}
          sx={{ width: '450px' }}
        />
      </Stack>
      <Stack direction="row" gap={5}>
        <SmallRequiredTypography title="UPLOAD BACKGROUND GLB" />
        <CustomUpload
          file={secondFile}
          onDrop={handleDropSecondFile}
          onDelete={() => {
            setSecondFile(null);
            setFieldValue('backgroundGlb', null);
          }}
          accept={accept}
          sx={{ width: '450px' }}
        />
      </Stack>
    </Stack>
  );
}
