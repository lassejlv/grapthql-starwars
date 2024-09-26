import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { url } from '../queries';
import { AllMoviesQuery, Film, type AllMoviesQueryResponse } from '../queries/AllMovies';
import { css } from '../../styled-system/css';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import Header from '../components/Header';

export const Route = createFileRoute('/')({
   component: HomeComponent,
});

function HomeComponent() {
   const [currentMovie, setCurrentMovie] = useState<Film | null>(null);

   const movies = useQuery({
      queryKey: ['allMovies'],
      queryFn: async () => {
         await new Promise((resolve) => setTimeout(resolve, 500));

         return (await request(url, AllMoviesQuery)) as AllMoviesQueryResponse;
      },
   });

   return (
      <>
         <Header logo='/logo-white.png' />

         {currentMovie && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
               className={css({ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, bg: 'rgba(0, 0, 0, 0.5)', zIndex: 10 })}
            >
               <div
                  className={css({
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     bg: 'darkerLighter',
                     p: 6,
                     borderRadius: 'md',
                     w: '90%',
                     md: { w: '60%' },
                  })}
               >
                  <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>{currentMovie.title}</h1>
                  <p className={css({ fontSize: 'lg', mt: 2 })}>{currentMovie.openingCrawl}</p>

                  <p className={css({ fontSize: 'md' })}>
                     <b>Director:</b> {currentMovie.director} | <b>Producer:</b> {currentMovie.producers} | <b>Release Date:</b>{' '}
                     {currentMovie.releaseDate}
                  </p>
                  <button
                     onClick={() => setCurrentMovie(null)}
                     className={css({
                        bg: 'blue',
                        py: '3',
                        px: '4',
                        rounded: 'md',
                        fontWeight: 'semibold',
                        cursor: 'pointer',
                        color: 'white',
                        transition: 'all 0.2s ease-in-out',
                        _hover: { bg: 'midDarkerBlue' },
                        mt: 4,
                     })}
                  >
                     I&apos;m done reading
                  </button>
               </div>
            </motion.div>
         )}

         <main
            className={css({
               display: 'flex',
               flexDir: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               my: 10,
            })}
         >
            <h1 className={css({ fontSize: '4xl', md: { fontSize: '6xl' }, fontWeight: 'bold', textAlign: 'center' })}>Star Wars Movies</h1>
            <p className={css({ fontSize: 'lg', mt: 4, textAlign: 'center' })}>
               Welcome to the Star Wars Movies app! Here you can find information about all the Star Wars movies.
            </p>

            {movies.isLoading ? (
               <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' })}>
                  <Loader size={40} />
               </div>
            ) : movies.error ? (
               <p className={css({ color: 'red', mt: 4 })}>Error: {movies.error.message}</p>
            ) : movies.data ? (
               <div
                  className={css({
                     display: 'grid',
                     gridTemplateColumns: '1',
                     md: { gridTemplateColumns: '3' },
                     p: '7',
                     gap: 4,
                     placeContent: 'center',
                     mt: 4,
                  })}
               >
                  {movies.data.allFilms.films.map((film) => (
                     <div
                        key={film.id}
                        className={css({
                           background: 'darkerBlue',
                           p: '3',
                           borderRadius: '10px',
                           color: 'white',
                        })}
                     >
                        <h1 className={css({ fontSize: 'lg', fontWeight: 'bold' })}>{film.title}</h1>
                        <p className={css({ fontSize: 'md', mt: 2 })}>{film.openingCrawl.split(' ').slice(0, 20).join(' ')}</p>

                        <button
                           onClick={() => setCurrentMovie(film)}
                           className={css({
                              bg: 'blue',
                              py: '3',
                              px: '4',
                              rounded: 'md',
                              fontWeight: 'semibold',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease-in-out',
                              _hover: { bg: 'midDarkerBlue' },
                           })}
                        >
                           Read More
                        </button>
                     </div>
                  ))}
               </div>
            ) : null}
         </main>

         <footer className={css({ bg: 'darkerLighter', p: 4, mt: 10, textAlign: 'center' })}>
            <p className={css({ fontSize: 'sm' })}>Made with ❤️ by lasse</p>
         </footer>
      </>
   );
}
