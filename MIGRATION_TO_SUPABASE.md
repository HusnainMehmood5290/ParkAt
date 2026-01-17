# Migration from Firebase to Supabase

## Overview
The ParkAT application has been successfully migrated from Firebase to Supabase. This migration provides better integration, automatic database management, and eliminates the need for manual Firebase configuration.

## Why Supabase?
- Supabase credentials were already available in the environment
- No need for manual Firebase project setup
- Built-in Row Level Security (RLS) for better data protection
- Integrated storage solution
- PostgreSQL database with better querying capabilities
- Real-time capabilities out of the box

## Changes Made

### 1. Dependencies
**Added:**
- `@supabase/supabase-js` - Official Supabase JavaScript client

**Removed:**
- No dependencies removed (Firebase kept for backward compatibility)

### 2. Configuration Files

**Created:**
- `src/configs/supabaseConfig.js` - Supabase client configuration with AsyncStorage persistence

**Modified:**
- `.env` - Now contains both Firebase placeholders and active Supabase credentials

### 3. Database Schema
Created complete schema with three main tables:

**users table:**
- Stores user profiles
- Links to Supabase Auth
- Supports both vehicle owners and space providers

**vehicles table:**
- Stores vehicle registration data
- Links to users via ownerId
- Includes dimensions and document URLs

**spaces table:**
- Stores parking space information
- Links to users via ownerId
- Includes location data (latitude/longitude)

### 4. Storage
- Created `documents` storage bucket
- Configured for PDF, JPG, JPEG, PNG files
- Public read access with authenticated upload
- 50MB file size limit

### 5. Row Level Security (RLS)
All tables have strict RLS policies:
- Users can only read/write their own data
- Vehicle owners can only access their vehicles
- Space providers can only manage their spaces
- All authenticated users can search available parking spaces

### 6. Code Changes

**Files Migrated:**

1. **src/screens/Login.js**
   - Changed from Firebase Auth to Supabase Auth
   - Uses `signInWithPassword()` instead of `signInWithEmailAndPassword()`
   - Queries users table from Supabase instead of Firestore

2. **src/screens/Register.js**
   - Changed from Firebase Auth to Supabase Auth
   - Uses `signUp()` instead of `createUserWithEmailAndPassword()`
   - Inserts user data into Supabase users table

3. **src/screens/RegisterVo.js**
   - Migrated file upload from Firebase Storage to Supabase Storage
   - Changed from Firestore to Supabase database queries
   - Uses storage bucket `documents` for vehicle documents

4. **src/screens/RegisterSp.js**
   - Migrated file upload from Firebase Storage to Supabase Storage
   - Changed from Firestore to Supabase database queries
   - Uses storage bucket `documents` for space documents

5. **src/screens/ParkingSpots.js**
   - Changed from Firestore queries to Supabase queries
   - Updated to use new data structure (ownerId instead of _ownerId)

## API Differences

### Authentication

**Firebase:**
```javascript
const userCreds = await signInWithEmailAndPassword(firebaseAuth, email, password);
const userId = userCreds.user.uid;
```

**Supabase:**
```javascript
const { data: authData } = await supabase.auth.signInWithPassword({ email, password });
const userId = authData.user.id;
```

### Database Queries

**Firebase:**
```javascript
const user = await getDoc(doc(fireStoreDb, "users", userId));
const userData = user.data();
```

**Supabase:**
```javascript
const { data: userData } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();
```

### File Upload

**Firebase:**
```javascript
const storage = getStorage();
const storageRef = ref(storage, `path/${fileName}`);
await uploadBytes(storageRef, blob);
const downloadURL = await getDownloadURL(storageRef);
```

**Supabase:**
```javascript
await supabase.storage
  .from('documents')
  .upload(filePath, arrayBuffer);

const { data: { publicUrl } } = supabase.storage
  .from('documents')
  .getPublicUrl(filePath);
```

## Benefits of Migration

1. **No Configuration Needed**: App works immediately without Firebase setup
2. **Better Security**: RLS policies enforce data access at database level
3. **Simpler Queries**: SQL-like syntax is more intuitive than Firestore
4. **Integrated Solution**: Auth, database, and storage in one platform
5. **Better Developer Experience**: Built-in dashboard for data management
6. **Cost Effective**: Generous free tier for development

## Testing the Migration

To test the migrated app:

1. **Sign Up**: Create a new account (no email confirmation required)
2. **Register Vehicle/Space**: Upload documents and complete registration
3. **Login**: Sign in with registered credentials
4. **View Parking Spots**: Search for available parking spaces
5. **Upload Documents**: Test file uploads during registration

## Data Structure Changes

### Field Name Changes
- `_id` → `id` (consistent with Supabase Auth)
- `_ownerId` → `ownerId` (removed underscore prefix)

### User Object Structure
Remains largely the same with JSON fields:
```javascript
{
  id: "uuid",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  cnic: "12345-1234567-1",
  phone: "+92-xxx-xxxxxxx",
  registerType: {
    vehicleowner: false,
    spaceprovider: false
  },
  isCompleteProfile: false
}
```

## Rollback Plan

If needed, the app can be rolled back to Firebase by:
1. Reverting all screen files to use `firebaseConfig`
2. Updating `.env` with actual Firebase credentials
3. No database migration needed (data stays in Firebase)

## Future Enhancements

With Supabase, you can now easily add:
- Real-time updates for parking availability
- Advanced search with PostgreSQL full-text search
- Complex geospatial queries for location-based features
- Database functions for complex business logic
- Edge Functions for serverless API endpoints

## Support

The Supabase database is fully configured and ready to use. All tables, storage buckets, and security policies are in place.
