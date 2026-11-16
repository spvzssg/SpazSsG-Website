import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert, Modal } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('releases');

  // Content state
  const [releases, setReleases] = useState([
    { id: 1, title: "Still Dreaming", type: "Single", date: "2026", desc: "Dark melodic trap and atmospheric rap.", spotify: "https://open.spotify.com/album/4v5EahyLrmNBETJh8rh70o" },
    { id: 2, title: "Late Night Drive", type: "Single", date: "2025", desc: "Hypnotic production and cinematic emotion.", spotify: "https://open.spotify.com/artist/00IHJtvQJqIXnKhhvS3u92" }
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "WE GOING LIVE‼️", content: "Join the stream tonight on Twitch & TikTok LIVE." }
  ]);

  const [settings, setSettings] = useState({
    artistName: "Spaz SsG",
    tagline: "No Sleep, Just Dreams",
    discordUrl: "https://discord.gg/pk3r75EgD"
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    checkSavedSession();
  }, []);

  async function checkSavedSession() {
    try {
      const savedAuth = await SecureStore.getItemAsync('spaz_admin_auth');
      if (savedAuth === 'true') {
        // Optional Face ID check
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (hasHardware) {
          const result = await LocalAuthentication.authenticateAsync({
            promptName: 'Unlock Spaz SsG Admin',
            fallbackLabel: 'Use Passcode'
          });
          if (result.success) {
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(true);
        }
      }
    } catch (e) {
      console.log('Session check error:', e);
    }
  }

  async function handleLogin() {
    if (username === 'admin' && password === 'spazssg2026') {
      await SecureStore.setItemAsync('spaz_admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      Alert.alert('Authentication Failed', 'Invalid username or password. (admin / spazssg2026)');
    }
  }

  async function handleLogout() {
    await SecureStore.deleteItemAsync('spaz_admin_auth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  }

  function addRelease() {
    if (!newTitle) {
      Alert.alert('Error', 'Please enter a release title.');
      return;
    }
    const item = {
      id: Date.now(),
      title: newTitle,
      type: 'Single',
      date: '2026',
      desc: newDesc || 'Official independent release.',
      spotify: 'https://open.spotify.com/artist/00IHJtvQJqIXnKhhvS3u92'
    };
    setReleases([item, ...releases]);
    setNewTitle('');
    setNewDesc('');
    setModalVisible(false);
    Alert.alert('Success', 'Release added successfully!');
  }

  function deleteRelease(id) {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this release?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setReleases(releases.filter(r => r.id !== id)) }
    ]);
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>SPAZ SSG ADMIN</Text>
          <Text style={styles.loginSubtitle}>Private iOS Control Center</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spaz SsG Admin</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'releases' && styles.activeTab]} onPress={() => setActiveTab('releases')}>
          <Text style={[styles.tabText, activeTab === 'releases' && styles.activeTabText]}>Releases</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'announcements' && styles.activeTab]} onPress={() => setActiveTab('announcements')}>
          <Text style={[styles.tabText, activeTab === 'announcements' && styles.activeTabText]}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'settings' && styles.activeTab]} onPress={() => setActiveTab('settings')}>
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>Settings</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'releases' && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Music Releases ({releases.length})</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ Add Release</Text>
              </TouchableOpacity>
            </View>

            {releases.map(item => (
              <View key={item.id} style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.type} • {item.date}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteRelease(item.id)} style={styles.deleteBtn}>
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'announcements' && (
          <View>
            <Text style={styles.sectionTitle}>Live Announcements</Text>
            {announcements.map(item => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.content}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'settings' && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Artist Configuration</Text>
            <Text style={styles.label}>Artist Name</Text>
            <TextInput style={styles.input} value={settings.artistName} onChangeText={t => setSettings({...settings, artistName: t})} />

            <Text style={styles.label}>Tagline</Text>
            <TextInput style={styles.input} value={settings.tagline} onChangeText={t => setSettings({...settings, tagline: t})} />

            <TouchableOpacity style={styles.primaryButton} onPress={() => Alert.alert('Saved', 'Settings updated successfully!')}>
              <Text style={styles.primaryButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Add Release Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Release</Text>
            <TextInput style={styles.input} placeholder="Release Title" placeholderTextColor="#888" value={newTitle} onChangeText={setNewTitle} />
            <TextInput style={styles.input} placeholder="Description" placeholderTextColor="#888" value={newDesc} onChangeText={setNewDesc} />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <TouchableOpacity style={[styles.primaryButton, { flex: 1, backgroundColor: '#333' }]} onPress={() => setModalVisible(false)}>
                <Text style={[styles.primaryButtonText, { color: '#fff' }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.primaryButton, { flex: 1 }]} onPress={addRelease}>
                <Text style={styles.primaryButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#08090C' },
  loginCard: { flex: 1, justifyContent: 'center', padding: 24, maxWidth: 400, alignSelf: 'center', width: '100%' },
  loginTitle: { fontSize: 28, fontWeight: '700', color: '#00DDF5', textAlign: 'center', marginBottom: 8, fontFamily: 'Space Grotesk' },
  loginSubtitle: { fontSize: 14, color: '#D9DDE2', textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: 'rgba(217,221,226,0.05)', borderWidth: 1, borderColor: 'rgba(217,221,226,0.15)', borderRadius: 8, padding: 14, color: '#D9DDE2', fontSize: 16, marginBottom: 16 },
  primaryButton: { backgroundColor: '#00DDF5', borderRadius: 8, padding: 16, alignItems: 'center' },
  primaryButtonText: { color: '#08090C', fontWeight: '700', fontSize: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(217,221,226,0.1)' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#D9DDE2' },
  logoutText: { color: '#FF791D', fontWeight: '600' },
  tabContainer: { flexDirection: 'row', padding: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(217,221,226,0.1)' },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6, backgroundColor: 'rgba(217,221,226,0.03)' },
  activeTab: { backgroundColor: 'rgba(0,221,245,0.15)', borderWidth: 1, borderColor: '#00DDF5' },
  tabText: { color: '#888', fontWeight: '600', fontSize: 14 },
  activeTabText: { color: '#00DDF5' },
  content: { flex: 1, padding: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#D9DDE2', marginBottom: 12 },
  addButton: { backgroundColor: '#FF791D', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  addButtonText: { color: '#08090C', fontWeight: '700', fontSize: 13 },
  card: { backgroundColor: 'rgba(217,221,226,0.03)', borderWidth: 1, borderColor: 'rgba(217,221,226,0.1)', borderRadius: 10, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#D9DDE2', marginBottom: 4 },
  cardSubtitle: { fontSize: 12, color: '#00DDF5', marginBottom: 6 },
  cardDesc: { fontSize: 13, color: 'rgba(217,221,226,0.6)' },
  deleteBtn: { backgroundColor: 'rgba(255,0,0,0.15)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  deleteBtnText: { color: '#ff4444', fontWeight: '600', fontSize: 12 },
  label: { fontSize: 14, color: '#D9DDE2', marginBottom: 6, fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#08090C', borderWidth: 1, borderColor: 'rgba(217,221,226,0.2)', borderRadius: 12, padding: 24 }
});
