import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  type User
} from 'firebase/auth'
import { auth } from './config'

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code))
  }
}

export async function createUserWithEmail(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(userCredential.user)
    return userCredential.user
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code))
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth)
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code))
  }
}

function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address'
    case 'auth/user-disabled':
      return 'This account has been disabled'
    case 'auth/user-not-found':
      return 'No account found with this email'
    case 'auth/wrong-password':
      return 'Incorrect password'
    case 'auth/email-already-in-use':
      return 'An account already exists with this email'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters'
    case 'auth/operation-not-allowed':
      return 'Operation not allowed'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later'
    default:
      return 'An error occurred. Please try again'
  }
}

export type { User }