import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeVo from "../screens/HomeVo";
import MenuVo from "../screens/MenuVo";
import ParkingSpots from "../screens/ParkingSpots";
import Direction from "../screens/Direction";

const HomeVoDrawer = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerContent={() => <MenuVo />}>
      <Drawer.Screen
        options={{ headerShown: false }}
        name="HomeVoDrawer"
        component={HomeVo}
      />
      <Drawer.Screen name="Parking Spots" component={ParkingSpots} />
      <Drawer.Screen
        name="Direction"
        component={Direction}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default HomeVoDrawer;
