import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-web'

function Profile({ navigation }) {
    const githubUsername = navigation.getParam('github_username');
    return <webview style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }} />
}
export default Profile;