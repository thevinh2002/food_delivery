export function AuthProvider({ children }) {
    // Khởi tạo state từ localStorage nếu có, không thì dùng giá trị mặc định
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const login = (email, password) => {
        const found = users.find(user => user.email === email && user.password === password);
        if (found) {
            setUser(found);
            localStorage.setItem('currentUser', JSON.stringify(found));
            return true;
        }
        return false;
    };

    const register = (email, password) => {
        const exists = users.some(user => user.email === email);
        if (exists) return false;
        
        const newUser = { email, password };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}
