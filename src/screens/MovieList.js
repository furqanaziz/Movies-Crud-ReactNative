import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Icon, Content } from 'native-base';
import StarRating from 'react-native-star-rating';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchMovies, fetchMovieDetail, resetList, updateQuery, updateQueryDetail } from '../redux/actions';
import style from '../styles';
const MovieList = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const { movies, hasNext, nextPage } = useSelector(state => state.Movies);
    const [title, setTitle] = useState('');
    const [sortBy, setSortBy] = useState('weighted_average_vote');

    useEffect(() => {
        dispatch(fetchMovies());
    }, []);
    const moveNextPage = () => {
        if (hasNext) {
            let filters = ` sortedBy: "asc"
            sortedItem: "${sortBy}" pageNo:${nextPage} `;
            if (title != "")
                filters = filters + `searchBy: "${title}"`
            const query = ` query{
            listMoviesApi ( ${filters} ) {
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
                `
            dispatch(updateQuery(query));
            dispatch(fetchMovies())
        }
    }
    const applySearchORFilter = (updatesortby) => {
        dispatch(resetList());
        let filters = ` sortedBy: "asc"
        sortedItem: "${sortBy}" pageNo:1 `;
        if (updatesortby) {
            filters = ` sortedBy: "asc"
        sortedItem: "${updatesortby}" pageNo:1 `;
            setSortBy(updatesortby)
        }
        if (title != "")
            filters = filters + `searchBy: "${title}"`
        const query = ` query{
            listMoviesApi (${filters}) {
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
                `

       
        dispatch(updateQuery(query));
        dispatch(fetchMovies())

    }
    const goto_Detail = (title, avgRating, votes) => {
        const query = `
       query{
        moviesDetailApi (title:"${title}"){
      count
          firstPage
          count
          hasNext
          hasPrev
          last
          list{
            actors
            avgVote
            budget
            country
            datePublished
            description
            director
            duration
            genre
            language
            metascore
            originalTitle
            productionCompany
            reviewsFromCritics
            reviewsFromUsers
            title
            titleId
            usaGrossIncome
            votes
            worldwideGrossIncome
            writer
            year
          }
          nextPage
          prevPage
          page
        }
      }
       `;
        dispatch(updateQueryDetail(query));
        dispatch(fetchMovieDetail());
        navigation.navigate('MovieDetail', { avgRating, votes });

    }
    const renderItem = ({ title, year, genre, duration, director, avgRating, totalVote }) => (
        <TouchableOpacity onPress={() => goto_Detail(title, avgRating, totalVote)} style={styles.item}>
            <View style={styles.icon}>
                <Icon name="right" type="AntDesign" />
            </View>
            <Text style={styles.title}>{title||'Title'}</Text>
            <Text style={styles.genre}>{genre||'Genre'}</Text>
            <Text style={styles.director}>{director||'Director'}</Text>
            <View style={styles.subitemv}>
                <Text style={styles.subitem}>Votes</Text>
                <Text style={styles.subitem}>Duration</Text>
                <Text style={styles.subitem}>Year</Text>
                <Text style={styles.subitem}>Rating</Text>
            </View>
            <View style={styles.subitemv}>
                <Text style={styles.subitem}>{totalVote||0}</Text>
                <Text style={styles.subitem}>{duration||0}</Text>
                <Text style={styles.subitem}>{year||'0000'}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={parseFloat(avgRating) / 2}
                    starSize={15}
                    containerStyle={{ width: '25%', marginTop: 5 }}
                />
            </View>

        </TouchableOpacity>
    );
    return (
        <Container>
            <Header androidStatusBarColor="white" iosBarStyle="dark-content" style={style.headerbg} >
                <Left />
                <Body>
                    <Title style={style.headertitle}>Movie List</Title>
                </Body>
                <Right />
            </Header>
            <View style={styles.inputv}>
                <Text>Search By Title/Director</Text>
                <TextInput placeholderTextColor="#cececd" placeholder="Title/Director Name" value={title} onEndEditing={() => applySearchORFilter(false)} onChangeText={(value) => setTitle(value)} style={styles.input} />
            </View>
            <View style={styles.inputv}>
                <Text>Sort By</Text>
                <DropDownPicker
                    items={[
                        { label: 'Title', value: 'title', },
                        { label: 'Date of Release', value: 'year', },
                        { label: 'Average Rating', value: 'weighted_average_vote', },
                    ]}
                    defaultValue={sortBy}
                    containerStyle={{ height: 40, width: '50%' }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => applySearchORFilter(item.value)}
                />
            </View>
         
                <FlatList
                    data={movies}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(item,index) => index.toString()}
                    onEndReachedThreshold={0.7}
                    onEndReached={() => moveNextPage()}
                />
           
        </Container>
    );
}

const styles = StyleSheet.create({
    icon: { position: 'absolute', right: 5, top: 30 },
    item: {
        backgroundColor: '#cececd',
        padding: 5,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    genre: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    director: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
        width: '50%'
    },

    subitem: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
        width: '25%',
        textAlign: 'center'
    },
    inputv: { flexDirection: 'row', marginTop: 5, marginHorizontal: 10, alignItems: 'center', justifyContent: 'space-between' },
    input: {color:'black', borderWidth: 1, width: '50%', alignSelf: 'flex-end', borderRadius: 5, borderColor: '#cececd' },
    subitemv: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }
});

export default MovieList;