import {FlatList} from "react-native";
import styled from "styled-components/native";
import Hseperator from "./seperator/HSeperator";
import Trending from "./trending/Trending";

const ListCont = styled.View`
  margin-bottom: 20px;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 15px;
`;

interface ITitle {
  title: string;
  data: any;
}
const MediaTitle: React.FC<ITitle> = ({title, data}) => {
  return (
    <ListCont>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Hseperator />}
        contentContainerStyle={{paddingHorizontal: 30}}
        keyExtractor={(item) => item.id + ""}
        data={data}
        renderItem={({item}) => (
          <Trending
            backdropPath={item.backdrop_path}
            originalTitle={item.original_title ?? item.original_name}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListCont>
  );
};

export default MediaTitle;
