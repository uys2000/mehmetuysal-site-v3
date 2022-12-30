import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, addDoc, setDoc, updateDoc, Timestamp, serverTimestamp, collection, increment, query, where, getDoc, orderBy, getDocs, limit } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { Execute } from "../types/terminal"

let analytics: any;
let auth: any;
let db: any;

export const initializeAnalytics = async function () {
  analytics = await getAnalytics();
  return analytics
}
export const initializeAuth = async function () {
  auth = await getAuth()
  return auth
}
export const initializeFirebase = async function () {
  db = await getFirestore()
  return db
}

export const signFirebase = async function (mail: string, pass: string) {
  const userCredential = await signInWithEmailAndPassword(auth, mail, pass)
  return userCredential.user;
};
export const setCommand = function (outerCommmand: string, innerCommmand: string, type: boolean, ex: string, task: string) {
  const docRef = doc(db, "commands", outerCommmand)
  let data: Record<string, Execute> = {}
  data[innerCommmand] = {
    type: type,
    value: task,
    ex: ex,
  }
  return updateDoc(docRef, data).then(() => "Success").catch(() =>
    setDoc(docRef, data).then(() => "New command added")
  )
}
export const sendAnalyticsData = function (type: "general" | "link" | "terminal", name: string) {
  const table = type == "general" ? "AnalyticsGeneral" : type == "link" ? "AnalyticsLink" : "AnalyticsTerminal"
  const data = { timestamp: serverTimestamp(), name: name }
  const colRef = collection(db, table)
  return addDoc(colRef, data).then(() => {
    const docRef = doc(db, "Analytics", table)
    let aData: Record<string, any> = { timestamp: serverTimestamp() }
    aData[table] = increment(1)
    aData[name] = increment(1)
    return updateDoc(docRef, aData).catch(() => setDoc(docRef, aData))
  })
}
export const getAnalyticsDataTypes = function () {
  const refCol = collection(db, "Analytics")
  return getDocs(refCol)
}
export const getAnalyticsData = function (type: "general" | "link" | "terminal", name: string, count: number = 500) {
  const table = type == "general" ? "AnalyticsGeneral" : type == "link" ? "AnalyticsLink" : "AnalyticsTerminal"
  const docQuery = query(collection(db, table),
    where("name", "==", name),
    orderBy("timestamp", "desc"),
    where("timestamp", "<", Timestamp.fromDate(new Date())),
    limit(count));
  return getDocs(docQuery)
}
//export const getAnalyticsInfoData = function (type: "general" | "link" | "terminal", name: string) {
//  const table = type == "general" ? "AnalyticsGeneral" : type == "link" ? "AnalyticsLink" : "AnalyticsTerminal"
//  return getDoc(doc(db, table, name))
//}