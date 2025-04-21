import { useNavigation } from "@react-navigation/native";
const OpenDrawer = () => {
  const navigation = useNavigation();
  return navigation.openDrawer();
};
export default OpenDrawer;
