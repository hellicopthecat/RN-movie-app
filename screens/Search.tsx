import {useState} from "react";
import {useQuery} from "react-query";
import styled from "styled-components/native";
import {movieApi, tvApi} from "../api/api";
import {ActivityIndicator} from "react-native";
import MediaTitle from "../components/MediaTitle";
import {IMovieResponse} from "../types/movietype";

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 20px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;
const Search = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const {
    isLoading: movieLoading,
    data: movieData,
    refetch: searchMoive,
  } = useQuery<IMovieResponse>(["searchMovies", searchTxt], movieApi.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery<IMovieResponse>(["searchTv", searchTxt], tvApi.search, {
    enabled: false,
  });
  const onChangeTxt = (text: string) => setSearchTxt(text);
  const onSubmit = () => {
    if (searchTxt === "") {
      return;
    }
    searchMoive();
    searchTv();
  };
  const loading = movieLoading || tvLoading;
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        autoCapitalize="sentences"
        onChangeText={onChangeTxt}
        onSubmitEditing={onSubmit}
      />
      {loading ? <ActivityIndicator /> : null}
      {movieData ? (
        <MediaTitle title="Movie Results" data={movieData.results} />
      ) : null}
      {tvData ? <MediaTitle title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
};
export default Search;
