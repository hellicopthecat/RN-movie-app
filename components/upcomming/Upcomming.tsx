import styled from "styled-components/native";
import Poster from "../Poster";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";
import {IMovieData} from "../../types/movietype";

const CommingSoonCont = styled.View`
  padding: 0 30px;
  flex-direction: row;
  margin-bottom: 20px;
`;
const CommingInfo = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const CommingTitle = styled.Text`
  color: white;
`;
const CommingDesc = styled.Text`
  width: 80%;
  color: white;
`;
const CommingDate = styled.Text`
  color: white;
`;

interface IUpcomming {
  posterPath: string;
  originalTitle: string;
  releaseDate: string;
  overView: string;
  fullData: IMovieData;
}

const Upcomming: React.FC<IUpcomming> = ({
  posterPath,
  originalTitle,
  releaseDate,
  overView,
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
      <CommingSoonCont>
        <Poster path={posterPath} />
        <CommingInfo>
          <CommingTitle>{originalTitle}</CommingTitle>
          <CommingDate style={{marginVertical: 10}}>
            {new Date(releaseDate).toLocaleDateString("ko")}
          </CommingDate>
          <CommingDesc>{overView.slice(0, 80)} ...</CommingDesc>
        </CommingInfo>
      </CommingSoonCont>
    </TouchableOpacity>
  );
};

export default Upcomming;
