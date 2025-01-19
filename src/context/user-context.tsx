import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
    emailOrPhone: string;
    userId: number;
    token: string;
    name: string;
    partyId: number;
    oldPassword?: string;
}

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const logout = async () => {
        await AsyncStorage.removeItem("access_token");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
