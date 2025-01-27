import MovieCard from '@/movies/MovieCard';
import { ID } from '@/common/CommonTypes';
import { useInfiniteQuery } from 'react-query';
import { getAllPageResults } from '@/common/CommonUtils';
import { movieQueries } from '@/movies/movieQueries';
import InfiniteGridList from '@/common/InfiniteGridList';

interface RecommendationsProps {
  movieId: ID;
}

function Recommendations({ movieId }: RecommendationsProps) {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
    movieQueries.movieRecommendations(movieId),
  );

  return (
    <InfiniteGridList
      loading={isFetching}
      listEmptyMessage="No recommendation has been found."
      hasNextPage={!!hasNextPage}
      onLoadMore={fetchNextPage}
    >
      {getAllPageResults(data).map((movie) => {
        return (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        );
      })}
    </InfiniteGridList>
  );
}

export default Recommendations;
