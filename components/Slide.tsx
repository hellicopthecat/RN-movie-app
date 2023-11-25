import {StyleSheet, useColorScheme} from "react-native";
import styled from "styled-components/native";
import {BlurView} from "expo-blur";
import {makeImagePath} from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

const Wrapper = styled.View`
  flex: 1;
`;
const MovieCont = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const BgImg = styled.Image``;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.accentColor};
  font-size: 16px;
  font-weight: 600;
`;
const OverView = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  height: 40%;
  margin-top: 10px;
`;

interface ISlide {
  backdropPath: string;
  overView: string;
  posterPath: string;
  movieTitle: string;
  voteAverage: number;
}
const Slide: React.FC<ISlide> = ({
  backdropPath,
  posterPath,
  movieTitle,
  voteAverage,
  overView,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Wrapper style={{backgroundColor: "red"}}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{uri: makeImagePath(backdropPath)}}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        intensity={50}
        tint={isDark ? "dark" : "light"}
      >
        <MovieCont>
          <Poster path={posterPath} />
          <Column>
            <Title>{movieTitle}</Title>
            <OverView>{overView.slice(0, 40)}...</OverView>
            {voteAverage > 0 ? <Votes rates={voteAverage} /> : null}
          </Column>
        </MovieCont>
      </BlurView>
    </Wrapper>
  );
};
export default Slide;
