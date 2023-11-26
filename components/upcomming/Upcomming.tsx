import styled from "styled-components/native";
import Poster from "../Poster";

const CommingSoonCont = styled.View`
  padding: 0 30px;
  flex-direction: row;
  margin-bottom: 25px;
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
}

const Upcomming: React.FC<IUpcomming> = ({
  posterPath,
  originalTitle,
  releaseDate,
  overView,
}) => {
  return (
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
  );
};

export default Upcomming;
