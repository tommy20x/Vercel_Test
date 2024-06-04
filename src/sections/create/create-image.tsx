'use client';

import React from 'react';
import { useFormikContext } from 'formik';

import { Stack, Button } from '@mui/material';

import { CustomUpload } from 'src/components/custom-upload';
import { SmallTypography, SmallRequiredTypography } from 'src/components/custom-typo/custom-typo';

export default function CreateImage() {
  const [mainFile, setMainFile] = React.useState<File | string | null>(null);
  const [secondFile, setSecondFile] = React.useState<File | string | null>(null);
  const { setFieldValue } = useFormikContext();

  const accept = { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.svg'] };

  const handleDropMainFile = React.useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setMainFile(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );
        setFieldValue('mainImage', newFile);
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
        setFieldValue('secondImage', newFile);
      }
    },
    [setFieldValue]
  );

  return (
    <Stack direction="row" gap={3} flexWrap="wrap" justifyContent="space-between">
      <Stack direction="row">
        <SmallRequiredTypography title="UPLOAD MAIN IMAGE" />
        <CustomUpload
          file={mainFile}
          onDrop={handleDropMainFile}
          onDelete={() => {
            setMainFile(null);
            setFieldValue('mainImage', null);
          }}
          accept={accept}
          sx={{ width: '450px' }}
        />
      </Stack>
      <Stack direction="row" gap={3}>
        <SmallTypography title="UPLOAD SECONDARY IMAGE" />
        <CustomUpload
          file={secondFile}
          onDrop={handleDropSecondFile}
          onDelete={() => {
            setSecondFile(null);
            setFieldValue('secondImage', null);
          }}
          accept={accept}
          sx={{ width: '450px' }}
        />
      </Stack>
      <Stack direction="row" gap={1}>
        <Stack gap={1} justifyContent="space-between">
          <SmallRequiredTypography title="MAIN COLOR" />
          {colors.map((types, index) => (
            <Button
              key={index}
              variant="contained"
              color={types.color}
              onClick={() => {
                setFieldValue('mainColor', types.color);
              }}
            >
              {types.name}
            </Button>
          ))}
        </Stack>
        <Stack gap={1} justifyContent="space-between">
          <SmallRequiredTypography title="SECONDARY COLOR" />
          {colors.map((types, index) => (
            <Button
              key={index + 6}
              variant="contained"
              color={types.color}
              onClick={() => {
                setFieldValue('secondColor', types.color);
              }}
            >
              {types.name}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

const colors = [
  { color: 'primary', name: 'BLUE' },
  { color: 'secondary', name: 'GREEN' },
  { color: 'info', name: 'INFO' },
  { color: 'success', name: 'SUCCESS' },
  { color: 'warning', name: 'WARNING' },
  { color: 'error', name: 'RED' },
];
