import { Grid } from '@mui/material';

import FortniteSoloCard from 'src/components/fortnite-cards/fortnite-solo-card';

import { useCheckoutContext } from 'src/sections/checkout/context';

export default function PlayerConfirmContent({ characters }: any[] | any) {
  const { setGlbId,setGlb } = useCheckoutContext();

  const handleClick = (e: any) => {
    setGlbId(e._id);
    setGlb(e.character);
  }

  const container = characters.map((skin: any, index: number) => (
    <Grid
      item
      key={index}
      xs={2.4}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <FortniteSoloCard
        title="Skin"
        description="Skin"
        mainImage={skin.coverImage}
        onClick={() => handleClick(skin)}
      />
    </Grid>
  ));

  return <Grid container>{container}</Grid>;
}

const skins = [
  'ballerina.png',
  'cowboy.png',
  'doctor.png',
  'explorer.png',
  'farmer.png',
  'fat01.png',
  'fat02.png',
  'hood01.png',
  'hood02.png',
  'hood03.png',
  'onebunny.png',
  'onecat.png',
  'onedino.png',
  'pirate01.png',
  'pirate02.png',
  'prince.png',
  'puffer.png',
  'scifi.png',
  'scourskirt.png',
  'scoutshorts.png',
  'superhero01.png',
  'superhero02.png',
  'swim01.png',
  'swim02.png',
  'viking.png',
  'viking01.png',
  'wetsuit.png',
];
