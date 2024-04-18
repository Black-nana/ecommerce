import React, { useState } from 'react';
import { useAuth } from '../Auth/useAuth';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TextGradient from './TextGradient';
import bars from '../assets/bar-1.svg';
import Loading from './Loading';
import toast, { Toaster } from 'react-hot-toast';

interface User {
 id: string;
 username: string;
 email: string;
 address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
 };
 name: {
    firstname: string;
    lastname: string;
 };
 phone: string;
}

const UserProfile: React.FC = () => {
 const { user } = useAuth();
 console.log('user', user);
 
 const [profile, setProfile] = useState<User>({
    id: '',
    username: '',
    email: '',
    address: {
      geolocation: {
        lat: '',
        long: '',
      },
      city: '',
      street: '',
      number: 0,
      zipcode: '',
    },
    name: {
      firstname: '',
      lastname: '',
    },
    phone: '',
 });

//  const decodedToken = user?.token && jwtDecode(user.token);
//  console.log('decoded token', decodedToken);
 
 const { error, isLoading } = useQuery({
    queryKey: ['ProfileData'],
    queryFn: async () => {
      try {
        const profileResponse = await axios.get(
          `https://blogs-iaq6.onrender.com/register${user?.id}`
        );
        setProfile(profileResponse.data);
        console.log('profile data from api ',profileResponse.data);
        
        return profileResponse.data;
      } catch (error) {
        throw new Error('Failed to fetch user profile');
      }
    },
 });

 const handleSave = async () => {
    try {
      const response = await axios.put(`
        https://blogs-iaq6.onrender.com/register${user?.id}`,
        profile
      );
      console.log('Profile updated successfully:', response.data);
      toast('Profile updated successfully');
      toast('Continue shopping');
      // Optionally, update the UI or show a success message
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
      // Optionally, show an error message
    }
 };

 if (isLoading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>
  );
}
 if (error) {
    return <p>{error.message}</p>;
 }

 return (
    <div className="grid place-items-center w-full mb-10">
       <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <TextGradient>
        <div className="grid place-items-center">
          <h1>User Profile</h1>
          <div>
            <img
              alt="bar"
              loading="lazy"
              width="500"
              height="50"
              decoding="async"
              data-nimg="1"
              className="mt-6"
              src={bars}
            />
          </div>
        </div>
      </TextGradient>
      <div className="border-t-3 border-blue-950 w-full h-2"></div>
      <div className="w-full flex flex-col justify-center items-center gap-10">
        <div className="w-full grid lg:grid-cols-4 gap-4 px-2">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="p-2 border-2 rounded-lg font-sans"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="p-2 border-2 rounded-lg font-sans"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              className="p-2 border-2 rounded-lg font-sans"
              value={profile.address.street}
              onChange={(e) =>
                setProfile({
                 ...profile,
                 address: { ...profile.address, street: e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className="p-2 border-2 rounded-lg font-sans"
              value={profile.address.city}
              onChange={(e) =>
                setProfile({
                 ...profile,
                 address: { ...profile.address, city: e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zipcode">Zipcode</label>
            <input
              type="text"
              id="zipcode"
              className="p-2 border-2 rounded-lg font-sans"
              value={profile.address.zipcode}
              onChange={(e) =>
                setProfile({
                 ...profile,
                 address: { ...profile.address, zipcode: e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              className="p-2 border-2 rounded-lg font-sans"
              value={profile.name.firstname}
              onChange={(e) =>
                setProfile({
                 ...profile,
                 name: { ...profile.name, firstname: e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              className="p-2 border-2 rounded-lg font-sans"
              value={profile.name.lastname}
              onChange={(e) =>
                setProfile({
                 ...profile,
                 name: { ...profile.name, lastname: e.target.value },
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              className="p-2 border-2 rounded-lg font-sans"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSave}
            className="text-base border-2 rounded-lg p-2 hover:scale-105">
            Save Edit
          </button>
        </div>
      </div>
      
    </div>
 );
};

export default UserProfile;
