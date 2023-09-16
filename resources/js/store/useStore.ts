import {create} from "zustand"
import {mountStoreDevtool} from "simple-zustand-devtools"
import createAuthSlice, { AuthSlice } from "./slices/authSlice";

interface Store extends AuthSlice {}

const useStore = create<Store>((set)=>({
  ...createAuthSlice(set),
}))

if(import.meta.env.VITE_NODE_ENV !== 'production') {
  mountStoreDevtool('StateManagement', useStore);
}

export default useStore;


