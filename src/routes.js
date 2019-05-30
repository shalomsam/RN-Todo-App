import React from 'react';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesome } from '@expo/vector-icons';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Header from './components/UI/Header';
import TaskLists from './screens/TaskLists';
import Tasks from './screens/Tasks';
import Profile from './screens/Profile';
import AuthLoading from './screens/AuthLoading';
import { gutter, colors } from './utils/styles';

export const AuthStack = createStackNavigator({
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: <Header title="Signup" backgroundColor={colors.primary} />,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: <Header title="Login" backgroundColor={colors.primary} />,
    },
  },
});

export const ListsStack = createStackNavigator({
  TaskLists: {
    screen: TaskLists,
  },
  Todos: {
    screen: Tasks,
  },
},
{
  headerMode: 'none',
  initialRouteName: 'TaskLists',
});

export const AppStack = createBottomTabNavigator({
  Lists: {
    screen: ListsStack,
    navigationOptions: {
      tabBarLabel: 'Lists',
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="th-list" size={30} color={tintColor} />
      ),
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'User',
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="user-circle" size={30} color={tintColor} />
      ),
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.white,
    inactiveTintColor: colors.lightGrey,
    style: {
      height: 56,
      backgroundColor: colors.secondary,
      paddingTop: gutter,
      paddingBottom: gutter,
    },
  },
});

const Router = createSwitchNavigator({
  AuthLoading,
  Auth: AuthStack,
  App: AppStack,
},
{
  initialRouteName: 'AuthLoading',
});

export default createAppContainer(Router);
