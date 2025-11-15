import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';

// Email/Password
export function signUpEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Google
export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

// GitHub
export function signInWithGitHub() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
}

// Apple
export function signInWithApple() {
  const provider = new OAuthProvider('apple.com');
  return signInWithPopup(auth, provider);
}
