import React, { FC, useEffect } from "react";
import { LogBox, Text } from "react-native";
import { PlateSaucesForm } from "../../components/plates/add-sauces/plate-sauces-form";
import {
  SauceBloc,
  SauceErrorState,
  SauceListEvent,
  SauceListState,
  SauceState,
} from "../../blocs";
import { SauceRepository } from "../../repositories";
import { BlocBuilder } from "@felangel/react-bloc";
import { AddSauceScreenRouteProps } from "../../navigator/navigator-type";

type Props = {
  route: AddSauceScreenRouteProps;
};

const AddSauces: FC<Props> = ({ route }) => {
  const sauceBloc = new SauceBloc(new SauceRepository());
  sauceBloc.add(new SauceListEvent());

  useEffect(() => {
    LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
    ]);
  }, []);

  return (
    <BlocBuilder
      bloc={sauceBloc}
      builder={(state: SauceState) => {
        if (state instanceof SauceErrorState) {
          return <Text>Error !</Text>;
        }
        if (state instanceof SauceListState) {
          return (
            <PlateSaucesForm availableSauces={state.sauces} route={route} />
          );
        }
        return <Text>Loading</Text>;
      }}
    />
  );
};

export default AddSauces;
