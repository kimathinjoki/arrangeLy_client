import React, { useState } from 'react';

function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567'
  });
  
  const [eventData, setEventData] = useState({
    eventName: 'Tobe Weds',
    eventDate: '2025-06-15',
    eventType: 'wedding',
    notifyGuests: true,
    sendReminders: true,
    reminderDays: 7
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleEventChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the API call to update profile information
    alert('Profile updated successfully!');
  };
  
  const handleEventSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the API call to update event settings
    alert('Event settings updated successfully!');
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    // Here you would handle the API call to update password
    alert('Password updated successfully!');
    
    // Reset password fields
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="sm:hidden">
          <label htmlFor="settingsTabs" className="sr-only">Select a tab</label>
          <select
            id="settingsTabs"
            name="tabs"
            className="block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="account">Account Settings</option>
            <option value="event">Event Settings</option>
            <option value="security">Security</option>
            <option value="notifications">Notifications</option>
          </select>
        </div>
        
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'account'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Account Settings
              </button>
              <button
                onClick={() => setActiveTab('event')}
                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'event'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Event Settings
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'security'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notifications
              </button>
            </nav>
          </div>
        </div>
        
        <div className="p-6">
          {/* Account Settings Tab */}
          {activeTab === 'account' && (
            <form onSubmit={handleProfileSubmit}>
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
          
          {/* Event Settings Tab */}
          {activeTab === 'event' && (
            <form onSubmit={handleEventSubmit}>
              <h2 className="text-lg font-medium mb-4">Event Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
                    Event Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventName"
                    type="text"
                    name="eventName"
                    value={eventData.eventName}
                    onChange={handleEventChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
                    Event Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventDate"
                    type="date"
                    name="eventDate"
                    value={eventData.eventDate}
                    onChange={handleEventChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventType">
                  Event Type
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="eventType"
                  name="eventType"
                  value={eventData.eventType}
                  onChange={handleEventChange}
                >
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <h3 className="text-md font-medium mb-3 mt-6">Guest Communication Settings</h3>
              
              <div className="mb-3">
                <div className="flex items-center">
                  <input
                    id="notifyGuests"
                    name="notifyGuests"
                    type="checkbox"
                    checked={eventData.notifyGuests}
                    onChange={handleEventChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="notifyGuests" className="ml-2 block text-sm text-gray-700">
                    Notify guests when you add them to your event
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="sendReminders"
                    name="sendReminders"
                    type="checkbox"
                    checked={eventData.sendReminders}
                    onChange={handleEventChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="sendReminders" className="ml-2 block text-sm text-gray-700">
                    Send event reminders before the event
                  </label>
                </div>
                
                {eventData.sendReminders && (
                  <div className="mt-3 ml-6">
                    <label className="block text-gray-700 text-sm mb-1" htmlFor="reminderDays">
                      Send reminder how many days before the event?
                    </label>
                    <select
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="reminderDays"
                      name="reminderDays"
                      value={eventData.reminderDays}
                      onChange={handleEventChange}
                    >
                      <option value="1">1 day</option>
                      <option value="3">3 days</option>
                      <option value="7">1 week</option>
                      <option value="14">2 weeks</option>
                    </select>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit}>
              <h2 className="text-lg font-medium mb-4">Change Password</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Password
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-md font-medium text-red-600 mb-3">Danger Zone</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete Account
                </button>
              </div>
            </form>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 block text-sm text-gray-700">
                      Email notifications for guest RSVPs
                    </span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 block text-sm text-gray-700">
                      Email notifications for guest list changes
                    </span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 block text-sm text-gray-700">
                      App notifications (push notifications)
                    </span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="ml-2 block text-sm text-gray-700">
                      SMS notifications
                    </span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 block text-sm text-gray-700">
                      Weekly summary reports
                    </span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 block text-sm text-gray-700">
                      Marketing updates and new features
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium mb-3">Quiet Hours</h3>
                <p className="text-sm text-gray-600 mb-3">
                  During quiet hours, you will not receive any notifications except for critical alerts.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quietHoursStart">
                      Start Time
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="quietHoursStart"
                      type="time"
                      defaultValue="22:00"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quietHoursEnd">
                      End Time
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="quietHoursEnd"
                      type="time"
                      defaultValue="07:00"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;