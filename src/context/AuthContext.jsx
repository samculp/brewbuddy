import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useEffect, useContext, createContext, useState } from "react"
import { auth, db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider(props) {
  const { children } = props
  const [globalUser, setGlobalUser] = useState(null)
  const [globalData, setGlobalData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    setGlobalUser(null)
    setGlobalData(null)
    return signOut(auth)
  }

  function resetPassowrd(email) {
    return sendPasswordResetEmail(auth, email)
  }

  const value = { globalUser, globalData, setGlobalData, isLoading, signup, login, logout }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Current user: ", user)
      setGlobalUser(user)
      // if there is no user, empty user state and return from listener
      if (!user) {
        console.log("No active user")
        return
      }

      // if there is a user, check if the user has data in db, fetch data, update global state
      try {
        setIsLoading(true)

        // first create reference for document (labelled json object)
        // then get doc and snapshot it so see if there is anything there
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        let firebaseData = {}
        if (docSnap.exists()) {
          firebaseData = docSnap.data()
          console.log("Found user data", firebaseData)
        }
        setGlobalData(firebaseData)
      } catch (err) {
        console.log(err.message)
      } finally {
        setIsLoading(false)
      }
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}