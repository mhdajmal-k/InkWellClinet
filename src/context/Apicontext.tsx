// import React, { createContext, useEffect, useState } from "react"
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store/store";


// export interface User {
//     user: string;
//     tokenJwt: string;
//     jwtRefreshToken: string;
// }

// interface UserContextType {
//     user: User | null;
//     setUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

// export const UserContext = createContext<UserContextType | undefined>(undefined)

// const ApiContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const dispath: AppDispatch = useDispatch()

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         const parsedUser = storedUser ? JSON.parse(storedUser) : null;
//         setUser(parsedUser);
//         alert(user?.user)
//     }, [dispath]);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export default ApiContext;
