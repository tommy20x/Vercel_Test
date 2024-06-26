'use client';

import React, { Suspense } from 'react';

import { Box } from '@mui/system';
import { Grid, Stack, Button, Typography } from '@mui/material';

import { useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Loading from 'src/app/loading';
import { useGetMails } from 'src/api/mail';
import { useAuthContext } from 'src/auth/hooks';
import { DEV_HOST_API } from 'src/config-global';
import { AnalyticsChartsValue } from 'src/constants';
import { useDashboardContext } from 'src/dashboard/hook/useDashboardContext';
import { mutateCharacter, getAllCharacters, getCurrentCharacter } from 'src/api/dashboard';

import { CustomStepper } from 'src/components/custom-stepper';
import { ApexBasicChart } from 'src/components/custom-apex-chart';
import ModelViewer from 'src/components/model-viewer/model-viewer';

import AnalyticsWebsiteVisits from 'src/sections/overview/analytics/analytics-website-visits';

import CustomMailList from './CustomMailList';
import PlayerEcoData from './player-eco-data';
import PlayerAlertBox from './player-alert-box';
import PlayerController from './player-controller';
import CustomAnalyticsSubject from './CustomAnalyticsSubject';
import PlayerConfirmDialog from './player-confirm-dialog/player-confirm-dialog';
import PlayerConfirmContent from './player-confirm-dialog/player-confirm-content';

export default function PlayerDashboard() {
  const openMail = useBoolean();
  const { user } = useAuthContext();
  const [glbId, setGlbId] = React.useState<string>();
  const { confirm } = useDashboardContext();
  const searchParams = useSearchParams();
  const [refresh, setRefresh] = React.useState(false);
  const selectedMailId = searchParams.get('id') || '';
  const selectedLabelId = searchParams.get('label') || 'inbox';
  const { mails, mailsLoading, mailsError, mailsEmpty } = useGetMails(selectedLabelId);
  const [characters, setCharacters] = React.useState<any>([]);
  const [characterUrl, setCharacterUrl] = React.useState<string>();

  React.useEffect(() => {
    const currentCharacter = async (uid: string) => {
      try {
        const result = await getCurrentCharacter(uid);
        setCharacterUrl(`${DEV_HOST_API}${result}`);
      } catch (e) {
        console.error(e);
      }
    };
    if (user?.uid) {
      currentCharacter(user?.uid);
    }
  }, [user, refresh]);

  const handleClickMail = React.useCallback((mailId: string) => {
    console.log('MailId: ', mailId);
  }, []);

  const handleGetCharacters = async () => {
    try {
      const result = await getAllCharacters();
      console.log('result: ', result);
      return result;
    } catch (error) {
      return console.error(error);
    }
  };

  const updateCharacter = async () => {
    try {
      if (glbId) {
        const result = await mutateCharacter({ uid: user?.uid, skinId: glbId });
        console.log('result: ', result);
        setRefresh(!refresh);
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    handleGetCharacters().then((result) => {
      const cardData = result.map((model: any) => {
        if (result.length > 0) {
          return {
            _id: model._id,
            coverImage: `${DEV_HOST_API}${model.path}/${model.coverImage}`,
            characterTitle: model.characterTitle,
            character: `${DEV_HOST_API}${model.path}/${model.files[0].title}`,
          };
        }
        return [];
      });
      setCharacters(cardData);
    });
  }, []);

  return (
    <Box component="div" sx={{ px: '24px' }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box component="div" height="473px" sx={{ position: 'relative' }}>
            <Suspense fallback={<Loading sx={{ zIndex: 0 }} />}>
              {!characterUrl ? <Loading sx={{ zIndex: 0 }} /> : <ModelViewer src={characterUrl} />}
            </Suspense>
          </Box>
          <PlayerController />
          <CustomAnalyticsSubject
            title=""
            chart={{
              categories: ['Speed', 'Endurance', 'Extra', 'Chores', 'Mini-Courses', 'Shields'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
              ],
            }}
          />
          <CustomMailList
            mails={mails}
            loading={mailsLoading}
            openMail={openMail.value}
            onCloseMail={openMail.onFalse}
            onClickMail={handleClickMail}
            selectedLabelId={selectedLabelId}
            selectedMailId={selectedMailId}
          />
        </Grid>
        <Grid item xs={7}>
          <Stack spacing={10} sx={{ py: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <PlayerEcoData />
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={3}>
                  <Typography variant="h4">Activity</Typography>
                  <ApexBasicChart />
                  <PlayerAlertBox />
                </Stack>
              </Grid>
            </Grid>
            <Stack spacing={3}>
              <Typography variant="h4">Level</Typography>
              <CustomStepper />
            </Stack>
            <Stack>
              <AnalyticsWebsiteVisits
                title="Daily Activity"
                subheader="(+43%) than last year"
                chart={AnalyticsChartsValue}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <PlayerConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Skins"
        content={<PlayerConfirmContent characters={characters} setGlbId={setGlbId} />}
        action={
          <Button variant="contained" color="primary" disabled={!glbId} onClick={updateCharacter}>
            Select
          </Button>
        }
      />
    </Box>
  );
}
