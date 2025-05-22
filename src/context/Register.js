export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]); // danh sách user đăng ký

    const login = (email, password) => {
        const found = users.find(user => user.email === email && user.password === password);
        if (found) {
            setUser(found);
            return true;
        }
        return false;
    };

    const register = (email, password) => {
        const exists = users.some(user => user.email === email);
        if (exists) return false;
        setUsers(prev => [...prev, { email, password }]);
        return true;
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}
