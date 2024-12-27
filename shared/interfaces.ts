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

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  budget?: number;
  status?: string;
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
  production_companies: ProductionCompany[];
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origiin_country: string;
}

export interface HeaderMenus {
  name: string;
  link: string;
  icon: string;
  childs: HeaderMenusChilds[];
}

export interface HeaderMenusChilds {
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating: number;
}
