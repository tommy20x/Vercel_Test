import React from 'react';
import { m } from 'framer-motion';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';

import { useGameContext } from 'src/game/hook/use-game-context';

import Image from 'src/components/image';
import { varFade, MotionContainer } from 'src/components/animate';
import Carousel, { useCarousel, CarouselDots, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
};

interface Props extends CardProps {
  list: ItemProps[];
  height: string | number;
}

const PlayFeatured = ({ list, height, ...other }: Props) => {
  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    ...CarouselDots({
      sx: {
        top: 16,
        left: 16,
        position: 'absolute',
        color: 'primary.light',
      },
    }),
  });

  return (
    <Card {...other}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem
            key={app.id}
            item={app}
            height={height}
            active={index === carousel.currentIndex}
          />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        sx={{ top: 8, right: 8, position: 'absolute', color: 'common.white' }}
      />
    </Card>
  );
};

export default React.memo(PlayFeatured);

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: ItemProps;
  height: string | number;
  active?: boolean;
};

const CarouselItem = React.memo(({ item, height, active }: CarouselItemProps) => {
  const theme = useTheme();
  const { setGameTitle } = useGameContext();

  const { coverUrl, title, description } = item;

  const renderImg = (
    <Image
      alt={title}
      src={coverUrl}
      overlay={`linear-gradient(to bottom, ${alpha(theme.palette.grey[900], 0)} 0%, ${
        theme.palette.grey[900]
      } 75%)`}
      sx={{
        width: 1,
        // height: {
        //   xs: 280,
        //   xl: 320,
        // },
        height: [height],
      }}
    />
  );

  const handleClick = () => {
    setGameTitle(title);
  };

  return (
    <MotionContainer onClick={handleClick} action animate={active} sx={{ position: 'relative' }}>
      <Stack
        spacing={1}
        sx={{
          p: 3,
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" sx={{ color: 'primary.light' }}>
            Featured App
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Link color="inherit" underline="none">
            <Typography variant="h5" noWrap>
              {title}
            </Typography>
          </Link>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </m.div>
      </Stack>

      {renderImg}
    </MotionContainer>
  );
});
