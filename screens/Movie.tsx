import {ActivityIndicator, Dimensions, useColorScheme} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {useEffect, useState} from "react";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import Votes from "../components/Votes";

interface IMovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ITrending extends IMovieData {
  media_type: string;
}

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const ScrollView = styled.ScrollView``;

const LoaderView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
`;
const TrendMovie = styled.View`
  margin-right: 15px;
  align-items: center;
`;
const TrendTitle = styled.Text`
  color: white;
  margin-top: 7px;
`;
const API_KEY = "659fcb8c58aae2c9fa0ee430456f44bd";

const Movie: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<IMovieData[]>([]);
  const [upComming, setUpComming] = useState<IMovieData[]>([]);
  const [trending, setTrending] = useState<ITrending[]>([]);
  const getTrending = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=kr`
      )
    ).json();
    setTrending(results);
  };
  const getNowPlaying = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=kr&page=1&region=kr`
      )
    ).json();
    setNowPlaying(results);
  };
  const getUpComming = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=kr&page=1&region=kr`
      )
    ).json();
    setUpComming(results);
  };
  const getData = async () => {
    try {
      await getNowPlaying();
      await getUpComming();
      await getTrending();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <LoaderView>
      <ActivityIndicator size="large" />
    </LoaderView>
  ) : (
    <ScrollView>
      <Swiper
        loop
        horizontal
        autoplay
        autoplayTimeout={3.5}
        showsPagination={false}
        showsButtons={false}
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 30,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            movieTitle={movie.title}
            voteAverage={movie.vote_average}
            overView={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: 30, paddingVertical: 20}}
      >
        {trending.map((trend) => (
          <TrendMovie key={trend.id}>
            <Poster path={trend.poster_path} />
            <TrendTitle>
              {trend.original_title.slice(0, 13)}
              {trend.original_title.length > 13 ? "..." : null}
            </TrendTitle>
            <Votes rates={trend.vote_average} />
          </TrendMovie>
        ))}
      </ScrollView>
    </ScrollView>
  );
};
export default Movie;
