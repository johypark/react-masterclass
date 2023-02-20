import { AnimatePresence, motion } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetTVsResult, useMultipleTvQuery } from "../api";
import Slider from "../components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 64px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const Sliders = styled.div``;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 36px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -80px;
`;

function TV() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ tvId: string }>("/tv/:tvId");

  const [
    { isLoading: loadingToday, data: todayData },
    { isLoading: loadingPopular, data: popularData },
    { isLoading: loadingTop, data: topData },
  ] = useMultipleTvQuery<IGetTVsResult>();

  const onOverlayClick = () => history.push("/tv");
  const clickedMovie =
    bigMovieMatch?.params.tvId &&
    (todayData?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.tvId
    ) ||
      popularData?.results.find(
        (movie) => movie.id === +bigMovieMatch.params.tvId
      ) ||
      topData?.results.find(
        (movie) => movie.id === +bigMovieMatch.params.tvId
      ));

  return (
    <Wrapper>
      {loadingToday || loadingPopular || loadingTop ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(todayData?.results[0].backdrop_path || "")}
          >
            <Title>{todayData?.results[0].name}</Title>
            <Overview>{todayData?.results[0].overview}</Overview>
          </Banner>
          <Sliders>
            <Slider type="tv" title="Airing Today" data={todayData} />
            <Slider type="tv" title="Popular" data={popularData} />
            <Slider type="tv" title="Top Rated" data={topData} />
          </Sliders>

          <AnimatePresence>
            {bigMovieMatch && (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie layoutId={bigMovieMatch.params.tvId}>
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.name}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default TV;
