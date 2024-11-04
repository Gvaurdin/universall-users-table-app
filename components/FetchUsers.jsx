import { useState, useEffect } from 'react';
import UsersTable from './UsersTable';
import UserDetails from './UserDetails';

export default function FetchUsers({ columns, minId = 1, maxId = 10, showTable = true }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // Состояние для выбранного пользователя

    useEffect(() => {
        const fetchUsersData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки данных: ${response.status}`);
                }
                const usersData = await response.json();
                const filteredUsers = usersData.filter(user => user.id >= minId && user.id <= maxId);
                setUsers(filteredUsers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsersData();
    }, [minId, maxId]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    if (loading) return <Spinner />;
    if (error) return <div className='error'>ERROR {error}</div>;
    if (users.length === 0) return <h4>Пользователи не найдены</h4>;

    return (
        <>
            {showTable && <UsersTable users={users} columns={columns} onUserSelect={handleUserSelect} />}
            {selectedUser && <UserDetails userId={selectedUser.id} />}
        </>
    );
}

function Spinner() {
    return <div><progress></progress></div>;
}