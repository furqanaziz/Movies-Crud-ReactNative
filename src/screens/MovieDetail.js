import React, { useState,useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Container, Header, List, ListItem, Left, Body, Right, Title, Icon, Content } from 'native-base';
import StarRating from 'react-native-star-rating';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import style from '../styles';
const MovieList = (route) => {
    const navigation = useNavigation();
    const {avgRating,votes}=route.route.params;
    useEffect(() => {
       //console.log("params=>",navigation.getParam)
    })
    const { movieDetail } = useSelector(state => state.Movies);
    const renderItem = (name) => (
        <View style={styles.list}>
            <View>
                <Text>{name}</Text>
            </View>
        </View>
    );
    console.disableYellowBox = true;
    return (
        <Container>
            <Header androidStatusBarColor="white" iosBarStyle="dark-content" style={style.headerbg} >
                <Left >
                    <Icon onPress={()=>navigation.pop()} name="left" type="AntDesign" />
                </Left>
                <Body>
                    <Title style={style.headertitle}>Movie Detail</Title>
                </Body>
                <Right />
            </Header>
            <Content  padder>
                <View style={styles.subitemv}>
                    <Text style={styles.subitem}> Votes</Text>
                    <Text style={styles.subitem}> Rating</Text>
                </View>
                <View style={styles.subitemv}>
                    <Text style={styles.subitem}>{votes}</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={parseFloat(avgRating)/2}
                        starSize={15}
                        containerStyle={styles.rating}
                    />
                </View>
                <List>
                    <ListItem >
                        <Text>List of Actors/Actress</Text>
                    </ListItem>
                    <FlatList
                        data={movieDetail?.actors?.split(', ') }
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={item => item}
                        scrollEnabled={false}
                    />
                    <ListItem >
                        <Text>Director's name</Text>
                    </ListItem>
                    <FlatList
                        data={movieDetail?.director?.split(', ')}
                        scrollEnabled={false}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={item => item}
                    />
                </List>

            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    rating: { width: 80, marginTop: 5 },
    subitemv: { flexDirection: 'row', marginTop: 10, marginHorizontal: 50, justifyContent: 'space-between', alignItems: 'center' },
    list: {
        backgroundColor: '#cececd',
        padding: 5,
        borderRadius: 5,
        marginVertical: 2,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        //  backgroundColor: 'red',
        //  width: '50%'
    },
    genre: {
        fontSize: 12,
        fontWeight: 'bold',
        //  backgroundColor: 'red',
        //  width: '50%'
    },
    director: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
        //  backgroundColor: 'red',
        width: '50%'
    },

    subitem: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
        //  backgroundColor: 'red',
        width: '25%',
        textAlign: 'center'
    },

});

export default MovieList;