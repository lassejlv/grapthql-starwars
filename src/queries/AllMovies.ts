export const AllMoviesQuery = `query Film {
  allFilms {
    films {
      id
      title
      episodeID
      openingCrawl
      producers
      releaseDate
      edited
      director
      created
    }
  }
}`;

export interface AllMoviesQueryResponse {
   allFilms: {
      films: Film[];
   };
}

export interface Film {
   id: string;
   title: string;
   episodeID: number;
   openingCrawl: string;
   producers: string[];
   releaseDate: string;
   edited: string;
   director: string;
   created: string;
}
