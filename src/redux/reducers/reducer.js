import {
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIE_DETAIL_SUCCESS,
    UPDATE_QUERY,
    UPDATE_QUERY_DETAIL,
    RESET_LIST
} from '../Constant';

const initState = {
    query: `
    query{
listMoviesApi ( sortedBy: "asc"
sortedItem: "weighted_average_vote") {
count
firstPage
count
hasNext
hasPrev
last
list{
       avgRating
  director
  duration
  genre
  title
  totalVote
  year
}
nextPage
prevPage
page
}
}
    `,
    queryDetail: '',
    count: 0, //total values
    firstPage: 1,  //page start index
    hasNext: false,
    hasPrev: false,
    last: 1,    //page last index
    nextPage: 2,
    page: 1,   //current page
    prevPage: 1
    ,
    movies: [
    ],
    movieDetail: {
    }

}
function movieReducer(state = initState, action) {
    switch (action.type) {
        case FETCH_MOVIES_SUCCESS:
            const { count, firstPage, hasNext, hasPrev, last, list, nextPage, page, prevPage } = action.payload;
            return { ...state, movies: [...state.movies, ...list], count, firstPage, hasNext, hasPrev, last, nextPage, page, prevPage }
        case FETCH_MOVIE_DETAIL_SUCCESS:
            return { ...state, movieDetail: action.payload.list[0] }
        case UPDATE_QUERY:
            return { ...state, query: action.query }
        case UPDATE_QUERY_DETAIL:
            return { ...state, queryDetail: action.query }
        case RESET_LIST:
            return { ...state, movies: [] }
        default:
            return state
    }
}

export default movieReducer;