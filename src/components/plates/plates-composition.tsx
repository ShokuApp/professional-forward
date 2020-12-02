import { StatusBar } from "expo-status-bar";
import React, {FC} from "react";
import {View,
        Text,
      StyleSheet} from "react-native"


const styles = StyleSheet.create({
  ingredients: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5
  },
  ingredientItems: {
    display: "flex",
    flexDirection: "row"
  },
  ingredientName: {
    color: "#9A9A9A",
    fontSize: 14
  }
})
type PlateCompositionProps = {
  label: string,
  list: string[]
}

const PlateComposition = ({label, list}: PlateCompositionProps) => {
  return (
    <View>
      <Text>{label}</Text>
      <View style={styles.ingredients}>
        {list.map(ingredient => {
          return (
            <View style={styles.ingredientItems}>
              {ingredient !== list[list.length - 1] ? (
                <View style={styles.ingredientItems}>
                  <Text style={styles.ingredientName}>{ingredient}</Text>
                  <Text style={styles.ingredientName}>, </Text>
                </View>
              ) :
              (<Text style={styles.ingredientName}>{ingredient}</Text>)}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default PlateComposition