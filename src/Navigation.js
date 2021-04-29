  
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieList from './screens/MovieList';
import MovieDetail from './screens/MovieDetail';

const Stack = createStackNavigator();
class Navigation extends Component {

  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="MovieList" component={MovieList} />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;