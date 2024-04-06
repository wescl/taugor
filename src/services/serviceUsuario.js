import { auth } from "./firebase";

const serviceUsuario = {
  login: async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await auth.signOut();
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser: () => {
    return auth.currentUser;
  },

  isAuthenticated: () => {
    return !!auth.currentUser;
  }
};

export default serviceUsuario;
