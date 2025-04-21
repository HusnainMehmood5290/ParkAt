# ParkAT - Effortless Parking Anywhere, Anytime 🚗

ParkAT is a mobile application designed to simplify parking for vehicle owners and space providers. It connects users with nearby parking spaces, enabling seamless booking and management of parking spots. Whether you're a vehicle owner looking for a parking spot or a space provider managing your parking spaces, ParkAT has you covered.

---

## Features

### For Vehicle Owners:
- **Find Nearby Parking Spots**: Locate parking spaces near your current location with real-time distance and estimated time.
- **Book Parking Spaces**: Send parking requests to space providers and get notified upon acceptance.
- **Navigation Assistance**: Get directions to your booked parking spot.
- **Fare Calculation**: Calculate parking charges based on the duration of your stay.
- **User Profile Management**: Manage your personal details and bookings.

### For Space Providers:
- **Register Parking Spaces**: Add parking spaces with dimensions and required documents.
- **Manage Requests**: Accept or reject parking requests from vehicle owners.
- **Earnings Dashboard**: Track your earnings and manage bookings.
- **Pending Requests**: View and manage pending parking requests.

---

## Tech Stack

- **Frontend**: React Native
- **Backend**: Firebase Firestore & Firebase Authentication
- **Location Services**: Expo Location
- **File Management**: Firebase Storage & Expo Document Picker
- **State Management**: React Hooks
- **Validation**: Formik & Yup

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HusnainMehmood5290/ParkAt.git.git
   cd ParkAT
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project.
   - Add your Firebase configuration to the `.env` file:
     ```env
     EXPO_PUBLIC_FIREBASE_apiKey=your_api_key
     EXPO_PUBLIC_FIREBASE_authDomain=your_auth_domain
     EXPO_PUBLIC_FIREBASE_projectId=your_project_id
     EXPO_PUBLIC_FIREBASE_storageBucket=your_storage_bucket
     EXPO_PUBLIC_FIREBASE_messagingSenderId=your_messaging_sender_id
     EXPO_PUBLIC_FIREBASE_appId=your_app_id
     EXPO_PUBLIC_FIREBASE_measurementId=your_measurement_id
     ```

4. Start the application:
   ```bash
   npm start
   ```

5. Run on your preferred platform:
   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

---

## Screenshots

### Splash Screen
![Splash Screen](assets/splash.png)


---

## Folder Structure

```
ParkAT/
├── assets/                # Images and icons
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # Application screens
│   ├── navigations/       # Navigation setup
│   ├── functions/         # Utility functions
│   ├── constraints/       # Validation schemas
│   ├── configs/           # Firebase configuration
├── .env                   # Environment variables
├── [`App.js`](App.js )                 # Entry point
├── [`package.json`](package.json )           # Project metadata and dependencies
```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any inquiries or support, please contact us at:
- **Email**: HusnainMehmood5290@gmail.com

---

Thank you for using ParkAT! 🚗✨