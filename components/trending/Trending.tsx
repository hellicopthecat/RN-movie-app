import styled from "styled-components/native";
import Poster from "../Poster";
import Votes from "../Votes";

const TrendMovie = styled.View`
  margin-right: 15px;
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
}
const Trending: React.FC<ITrend> = ({
  backdropPath,
  originalTitle,
  voteAverage,
}) => {
  return (
    <TrendMovie>
      <Poster path={backdropPath} />
      <TrendTitle>
        {originalTitle.slice(0, 13)}
        {originalTitle.length > 13 ? "..." : null}
      </TrendTitle>
      <Votes rates={voteAverage} />
    </TrendMovie>
  );
};
export default Trending;
