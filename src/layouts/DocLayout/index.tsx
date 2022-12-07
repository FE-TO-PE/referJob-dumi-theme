import React, { type FC, useMemo } from 'react';

import useThemeConfig from '../../hooks/useThemeConfig';

import { Helmet, useRouteMeta } from 'dumi';
import {
  Box,
  Container,
  Center,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import DocProvider from '../../components/DocProvider';
import AnnouncementBar from '../../slots/AnnouncementBar';
import Header from '../../slots/Header';
import Footer from '../../slots/Footer';

import heroBackground from '../../../media/hero-background.jpg';
import heroBackgroundDark from '../../../media/hero-background-dark.jpg';

/**
 * @description cover default struct of dumi layout
 * @returns
 */
const DocLayout: FC = () => {
  const themeConfig = useThemeConfig();
  const routeMeta = useRouteMeta();

  const { colorMode } = useColorMode();
  const backgroundImage = useColorModeValue(heroBackground, heroBackgroundDark);

  const helmetTitle = useMemo(() => {
    const { name, helmetIcon } = themeConfig;
    const { frontmatter } = routeMeta;
    return [name, helmetIcon, frontmatter?.title ?? name].join(' ');
  }, [themeConfig, routeMeta]);

  const helmetDescription = useMemo(() => {
    const { frontmatter } = routeMeta;
    const { description } = themeConfig;
    return frontmatter?.description ?? description;
  }, [routeMeta, themeConfig]);

  const { logo, keywords, author } = themeConfig;

  return (
    <>
      <Helmet>
        {logo && <link rel="shortcut icon" href={logo} />}
        <meta name="description" content={helmetDescription} />
        <meta name="color-scheme" content={colorMode} />
        <meta name="keywords" content={keywords?.join?.(',')} />
        <meta name="generator" content="dumi & chakra-dumi" />
        {author && <meta name="author" content={author} />}
        <title>{helmetTitle}</title>
      </Helmet>
      <Box
        minH="screenH"
        backgroundImage={backgroundImage}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        <AnnouncementBar />
        <Header />
        <Center>
          <Container
            maxW="container.xxl"
            minH="screenH"
            paddingInline={6}
            mt="calc(-1 * var(--chakra-sizes-18))"
            pt={18}
          >
            <Footer />
          </Container>
        </Center>
      </Box>
    </>
  );
};

const DocLayoutWithProvider: FC = () => (
  <DocProvider>
    <DocLayout />
  </DocProvider>
);

export default DocLayoutWithProvider;
