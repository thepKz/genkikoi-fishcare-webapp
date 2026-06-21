import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_BASE_apiKey,
  authDomain: import.meta.env.VITE_BASE_authDomain,
  projectId: import.meta.env.VITE_BASE_projectId,
  storageBucket: import.meta.env.VITE_BASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_BASE_messagingSenderId,
  appId: import.meta.env.VITE_BASE_appId,
};

// Khi chạy client-only mà chưa cấu hình Firebase (.env trống),
// initializeApp/getAuth sẽ throw "auth/invalid-api-key" và làm trắng trang.
// Bọc lại để app vẫn render được phần UI không phụ thuộc Firebase.
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

if (firebaseConfig.apiKey) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  console.warn(
    "[firebase] VITE_BASE_apiKey chưa được cấu hình — bỏ qua khởi tạo Firebase. " +
      "Các tính năng dùng Firebase Auth/Storage sẽ không hoạt động.",
  );
}

export { auth, storage };
