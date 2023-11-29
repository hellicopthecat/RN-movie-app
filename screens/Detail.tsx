import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useEffect} from "react";
import styled from "styled-components/native";
import {IDetail, IMovieData, ITvData} from "../types/movietype";
import Poster from "../components/Poster";
import {SCREEN_HEIGHT} from "../theme";
import {makeImagePath} from "../utils";
import {
  ActivityIndicator,
  Linking,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {DARK_COLOR} from "../color";
import {useQuery} from "react-query";
import {movieApi, tvApi} from "../api/api";
import {Ionicons} from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
const DetailCont = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
  flex-direction: row;
`;
const Title = styled.Text`
  font-size: 30px;
  width: 80%;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.txtColor};
`;
const DetailInfo = styled.View`
  padding: 0px 20px;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.txtColor};
  margin-top: 30px;
  margin: 20px 0px;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const BtnText = styled.Text`
  color: ${(props) => props.theme.txtColor};
  margin-bottom: 5px;
  font-weight: 600;
  line-height: 24px;
  margin-left: 10px;
`;
type RootStackParamList = {
  Detail: IMovieData | ITvData;
};
type DetailPageProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailPageProps> = ({
  navigation: {setOptions},
  route: {params},
}) => {
  const isMovie = "original_title" in params;
  const {isLoading, data} = useQuery<IDetail>(
    [isMovie ? "movieDetail" : "tvDetail", params.id],
    isMovie ? movieApi.detail : tvApi.detail
  );
  const shareMedia = async () => {
    const isAnroid = Platform.OS === "android";
    const homePage = `${params.overview}\nCheck it out : ${
      isMovie ? `https://www.imdb.com/title/${data?.imdb_id}/` : data?.homepage
    }`;
    if (isAnroid) {
      await Share.share({
        message: homePage,
        title: isMovie ? params.original_title : params.original_name,
      });
    } else {
      await Share.share({
        url: homePage,
        message: isMovie ? params.original_title : params.original_name,
      });
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" size={20} color="white" />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "MOVIE" : "TV",
      headerRight: () => <ShareButton />,
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYoutubeLink = async (videoID: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };
  return (
    <DetailCont>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{uri: makeImagePath(params.backdrop_path || "")}}
        />
        <LinearGradient
          colors={["transparent", DARK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <DetailInfo>
        <Overview>{params.overview}</Overview>
        {isLoading ? <ActivityIndicator /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYoutubeLink(video.key)}>
            <Ionicons name="logo-youtube" size={20} color="white" />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </DetailInfo>
    </DetailCont>
  );
};

export default Detail;
