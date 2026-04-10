// utils/storage.ts
import { MMKV } from 'react-native-mmkv';

// Initialize MMKV instance
export const storage = new MMKV({
  id: 'face-scan-storage',
});

export interface StoredCapture {
  angle: string;
  localPath: string; // Path to image in file system
  timestamp: number;
}

export const saveFaceScanCaptures = (sessionId: string, captures: StoredCapture[]) => {
  try {
    storage.set(`face_scan_${sessionId}`, JSON.stringify(captures));
    console.log('✅ Captures metadata saved to MMKV');
    return true;
  } catch (error) {
    console.error('Error saving captures to MMKV:', error);
    return false;
  }
};

export const getFaceScanCaptures = (sessionId: string): StoredCapture[] | null => {
  try {
    const data = storage.getString(`face_scan_${sessionId}`);
    if (data) {
      console.log('✅ Captures metadata retrieved from MMKV');
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error getting captures from MMKV:', error);
    return null;
  }
};

export const deleteFaceScanCaptures = (sessionId: string) => {
  try {
    storage.delete(`face_scan_${sessionId}`);
    console.log('✅ Captures metadata deleted from MMKV');
    return true;
  } catch (error) {
    console.error('Error deleting captures from MMKV:', error);
    return false;
  }
};
