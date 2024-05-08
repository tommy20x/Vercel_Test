import { Stack, Typography } from '@mui/material';

import FortniteSoloCard from 'src/components/fortnite-cards/fortnite-solo-card';
import FortniteCoupleCard from 'src/components/fortnite-cards/fortnite-couple-card';

export default function PlayFeatureSorted() {
  return (
    <Stack direction="column" width="35%" height="100%" sx={{ overflowY: 'scroll' }} gap="9px">
      {group.map((x, index) => (
        <FeatureGroup key={index} group={x} />
      ))}
    </Stack>
  );
}

interface Prop {
  group: string;
}

const FeatureGroup = ({ group }: Prop) => (
  <Stack direction="column" alignItems="start" gap="9px">
    <Typography component="div" id={group} sx={{ fonstSize: '16px !important', fontWeight: 600 }}>
      {group}
    </Typography>
    {cards.map(
      (x) =>
        // <PlayFeatured key={x} list={_playFeatured} sx={{ width: 169, height: 129 }} height={129} />
        // <Box component="div" width="330px" height="250px">
        group !== 'Shields' ? <FortniteSoloCard key={x} /> : <FortniteCoupleCard key={x} />
      // </Box>
    )}
  </Stack>
);

const group = ['Speed', 'Shields', 'Endurance'];
const cards = ['first', 'second'];
