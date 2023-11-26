import styled from "styled-components/native";
import {makeImagePath} from "../utils";

const PosterImg = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
`;
interface IPosterUrl {
  path: string;
}
const Poster: React.FC<IPosterUrl> = ({path}) => {
  return <PosterImg source={{uri: makeImagePath(path)}} />;
};

export default Poster;
