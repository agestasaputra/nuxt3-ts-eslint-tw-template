export interface SwiperRef extends HTMLElement {
  initialize: () => void;
  swiper?: any;
}

export interface SwiperConfig {
  autoHeight?: boolean;
  height?: number;
  slidesPerView: number;
  spaceBetween: number;
  navigation: boolean;
  pagination: {
    clickable: boolean;
  };
  breakpoints: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
}

export interface ResUpcomingMovie {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
