import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import {useQuery, useQueryClient} from "react-query";
import {tvApi} from "../api/api";
import styled from "styled-components/native";
import {ITvResponse} from "../types/movietype";
import MediaTitle from "../components/MediaTitle";
import {useState} from "react";
const LoaderView = styled.View``;

const Tv = () => {
  const [refresh, setRefresh] = useState(false);
  const queryClient = useQueryClient();
  const {isLoading: tvNowPlayLoading, data: tvNowPlayData} =
    useQuery<ITvResponse>(["TV", "tvNowPlay"], tvApi.getNowPlayTv);
  const {isLoading: tvTrendingLoading, data: tvTrendingData} =
    useQuery<ITvResponse>(["TV", "tvTrending"], tvApi.getTrendingTv);
  const {isLoading: tvTopRatedLoading, data: tvTopRatedData} =
    useQuery<ITvResponse>(["TV", "tvTopRated"], tvApi.getTopRatedTv);
  const activeRefresh = async () => {
    setRefresh(true);
    await queryClient.refetchQueries(["TV"]);
    setRefresh(false);
  };

  const isLoading = tvNowPlayLoading || tvTrendingLoading || tvTopRatedLoading;

  return isLoading ? (
    <LoaderView>
      <ActivityIndicator size={"large"} />
    </LoaderView>
  ) : (
    <ScrollView
      contentContainerStyle={{paddingVertical: 20}}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={activeRefresh} />
      }
    >
      <MediaTitle title="TV On Trendings" data={tvTrendingData?.results} />
      <MediaTitle title="Airing Today" data={tvNowPlayData?.results} />
      <MediaTitle title="TOP Rated On Tv" data={tvTopRatedData?.results} />
    </ScrollView>
  );
};
export default Tv;
