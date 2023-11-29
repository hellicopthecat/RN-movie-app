import {ActivityIndicator} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Upcomming from "../components/upcomming/Upcomming";
import {useQuery, useQueryClient} from "react-query";
import {movieApi} from "../api/api";
import {IMovieResponse} from "../types/movietype";
import MediaTitle from "../components/MediaTitle";
import Hseperator from "../components/seperator/HSeperator";
import {useState} from "react";
import {SCREEN_HEIGHT} from "../theme";

const WrapFlatList = styled.FlatList``;

const LoaderView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CommingContTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const Movie: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refresh, setRefresh] = useState(false);
  const queryClient = useQueryClient();
  const {isLoading: nowLoading, data: nowData} = useQuery<IMovieResponse>(
    ["movies", "nowPlay"],
    movieApi.getNowPlayingMovie
  );

  const {isLoading: trendLoading, data: trendData} = useQuery<IMovieResponse>(
    ["movies", "trendMoive"],
    movieApi.getTrendingMovie
  );
  const {isLoading: upcomeLoading, data: upcomeData} = useQuery<IMovieResponse>(
    ["movies", "upcomeMovie"],
    movieApi.getUpcommingMovie
  );
  const activeRefresh = async () => {
    setRefresh(true);
    await queryClient.refetchQueries(["movies"]);
    setRefresh(false);
  };

  const loading = nowLoading || trendLoading || upcomeLoading;

  return loading ? (
    <LoaderView>
      <ActivityIndicator size="large" />
    </LoaderView>
  ) : upcomeData ? (
    <WrapFlatList
      refreshing={refresh}
      onRefresh={activeRefresh}
      ListHeaderComponent={
        <>
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
            {nowData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overView={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendData ? (
            <MediaTitle title="Trending Movies" data={trendData?.results} />
          ) : null}
          <CommingContTitle>Comming Soon</CommingContTitle>
        </>
      }
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <Hseperator />}
      data={upcomeData.results}
      keyExtractor={(item) => item.id + ""}
      renderItem={({item}) => (
        <>
          <Upcomming
            posterPath={item.poster_path || ""}
            originalTitle={item.original_title}
            releaseDate={item.release_date}
            overView={item.overview}
            fullData={item}
          />
        </>
      )}
    />
  ) : null;
};
export default Movie;
