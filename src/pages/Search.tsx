import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useMultipleSearchQuery } from "../api";
import Slider from "../components/Slider";

const Wrapper = styled.div`
  margin-top: 100px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);

  const [
    { isLoading: loadingMovie, data: movieData },
    { isLoading: loadingTV, data: tvData },
  ] = useMultipleSearchQuery(keyword || "");

  return (
    <Wrapper>
      {!loadingMovie && (
        <Slider type="movies" title="Movies" data={movieData} />
      )}
      {!loadingTV && <Slider type="tv" title="TV" data={tvData} />}
    </Wrapper>
  );
}

export default Search;
