import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const PopUpHandler = (initialVisible = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const navigation = useNavigation();

  const showPopUp = () => {
    setIsVisible(true);
  };

  const hidePopUp = () => {
    setIsVisible(false);
  };

  const navigateTo = (screenName, params) => {
    setIsVisible(false);
    if (
      typeof params === "object" &&
      params !== null &&
      Object.keys(params).length === 1
    ) {
      const key = Object.keys(params)[0];
      const value = params[key];
      navigation.navigate(screenName, value);
    } else {
      navigation.navigate(screenName, { ...params });
    }
  };

  return {
    isVisible,
    showPopUp,
    hidePopUp,
    navigateTo,
  };
};

export default PopUpHandler;
