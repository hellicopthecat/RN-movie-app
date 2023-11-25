import styled from "styled-components/native";

const VotesTxt = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  margin-top: 3px;
`;
interface IMovieRates {
  rates: number;
}
const Votes: React.FC<IMovieRates> = ({rates}) => {
  return <VotesTxt>⭐️{rates.toFixed(1)} / 10</VotesTxt>;
};
export default Votes;
