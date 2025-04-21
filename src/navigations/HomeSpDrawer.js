import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuSp from "../screens/MenuSp";
import HomeSp from "../screens/HomeSp";
const HomeSpDrawer = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerContent={() => <MenuSp />}>
      <Drawer.Screen
        options={{ headerShown: false }}
        name="HomeSpDrawer"
        component={HomeSp}
      />
    </Drawer.Navigator>
  );
};

export default HomeSpDrawer;
