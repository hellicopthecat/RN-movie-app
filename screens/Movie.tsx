import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  useColorScheme,
} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {useEffect, useState} from "react";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import Trending from "../components/trending/Trending";
import Upcomming from "../components/upcomming/Upcomming";

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
const ListCont = styled.View`
  margin-bottom: 40px;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
`;

const CommingContTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const API_KEY = "659fcb8c58aae2c9fa0ee430456f44bd";

const Movie: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const isDark = useColorScheme() === "dark";
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<IMovieData[]>([]);
  const [upComming, setUpComming] = useState<IMovieData[]>([]);
  const [trending, setTrending] = useState<ITrending[]>([]);
  const getTrending = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=ko`
      )
    ).json();
    setTrending(results);
  };
  const getNowPlaying = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=kr`
      )
    ).json();
    setNowPlaying(results);
  };
  const getUpComming = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&region=kr`
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
  const activeRefresh = async () => {
    setRefresh(true);
    await getData();
    setRefresh(false);
  };
  return loading ? (
    <LoaderView>
      <ActivityIndicator size="large" />
    </LoaderView>
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={activeRefresh} />
      }
    >
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
      <ListCont>
        <ListTitle>Trending Movies</ListTitle>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 30, paddingVertical: 20}}
        >
          {trending.map((trend) => (
            <Trending
              key={trend.id}
              backdropPath={trend.poster_path}
              originalTitle={trend.original_title}
              voteAverage={trend.vote_average}
            />
          ))}
        </ScrollView>
      </ListCont>
      <ListCont>
        <CommingContTitle>Comming Soon</CommingContTitle>
        {upComming.map((come) => (
          <Upcomming
            key={come.id}
            posterPath={come.poster_path}
            originalTitle={come.original_title}
            releaseDate={come.release_date}
            overView={come.overview}
          />
        ))}
      </ListCont>
    </ScrollView>
  );
};
export default Movie;
