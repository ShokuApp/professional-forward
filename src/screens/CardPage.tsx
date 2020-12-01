import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dish } from '../models/dish'

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    cardCategoryType: {
      color: '#2196F3',
      fontSize: 14
    }
  }
);

type CardCategoryProps = {
  title: string;
  type: string;
};

const CARD_CATEGORY: CardCategoryProps[] = [
  {
    title: "Mes entrées",
    type: "starter",
  },
  {
    title: "Mes plats",
    type: "plate"
  },
  {
    title: "Mes desserts",
    type: "dessert"
  }
];

type Props = {
  props: CardCategoryProps,
  list: Dish[]
}

const CardCategory = ({props, list}: Props) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

const CardPage = () => {
  return (
    <View>
      {CARD_CATEGORY.map((card) => {
        return (
          <View key={card.title}>
            <CardCategory props={card} list={[]}/>
          </View>
        );
      })}
    </View>
  );
};

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 2,
          },
        }}
      >
        <Stack.Screen name="Ma carte" component={CardPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};