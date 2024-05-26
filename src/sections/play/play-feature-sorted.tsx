import React from 'react';
import { isArray } from 'lodash';

import { Stack } from '@mui/material';

import { DEV_HOST_API } from 'src/config-global';
import { useGameContext } from 'src/game/hook/use-game-context';

import FortniteSoloCard from 'src/components/fortnite-cards/fortnite-solo-card';
import FortniteCoupleCard from 'src/components/fortnite-cards/fortnite-couple-card';

function GameCard({ cardData }: any) {
  const mainImagePath = cardData.files[0];
  if (cardData.secondColor) {
    const secondImagePath = cardData.files[1];
    return (
      <FortniteCoupleCard
        title={cardData.gameTitle}
        mainImage={`${DEV_HOST_API}/${mainImagePath.mainImage}`}
        secondImage={`${DEV_HOST_API}/${secondImagePath.secondImage}`}
      />
    );
  }
  return (
    <FortniteSoloCard
      title={cardData.gameTitle}
      mainImage={`${DEV_HOST_API}/${mainImagePath.mainImage}`}
    />
  );
}

export default function PlayFeatureSorted() {
  const { data } = useGameContext();

  console.log(data);

  return (
    <Stack
      direction="column"
      width="35%"
      height="100%"
      sx={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
      gap="9px"
    >
      <Stack direction="column" alignItems="start" gap="9px">
        {isArray(data) && data.length > 0 && data.map((x) => <GameCard key={x._id} cardData={x} />)}
      </Stack>
    </Stack>
  );
}
