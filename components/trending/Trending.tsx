import styled from "styled-components/native";
import Poster from "../Poster";
import Votes from "../Votes";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";
import {IMovieData, ITvData} from "../../types/movietype";

const TrendMovie = styled.View`
  align-items: center;
`;
const TrendTitle = styled.Text`
  color: white;
  margin-top: 7px;
`;
interface ITrend {
  backdropPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: IMovieData | ITvData;
}
const Trending: React.FC<ITrend> = ({
  backdropPath,
  originalTitle,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <TrendMovie>
        <Poster path={backdropPath} />
        <TrendTitle>
          {originalTitle.slice(0, 13)}
          {originalTitle.length > 13 ? "..." : null}
        </TrendTitle>
        <Votes rates={voteAverage} />
      </TrendMovie>
    </TouchableOpacity>
  );
};
export default Trending;
