import { useState, useEffect } from 'react';
import UserPosts from './UserPosts';

export default function UserDetails({ userId }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPosts, setShowPosts] = useState(false); // состояние для показа постов

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки данных: ${response.status}`);
                }
                const userData = await response.json();
                setUserDetails(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, [userId]);

    if (loading) return <Spinner />;
    if (error) return <div className='error'>ERROR {error}</div>;

    return (
        <div>
            <h2>Подробная информация о пользователе</h2>
            <p><strong>Имя:</strong> {userDetails.name}</p>
            <p><strong>Электронная почта:</strong> {userDetails.email}</p>
            <p><strong>Телефон:</strong> {userDetails.phone}</p>
            <p><strong>Компания:</strong> {userDetails.company.name}</p>
            <button onClick={() => setShowPosts(!showPosts)}>
                {showPosts ? 'Скрыть посты' : 'Отобразить посты пользователя'}
            </button>
            {showPosts && <UserPosts userId={userId} />}
        </div>
    );
}

function Spinner() {
    return <div><progress></progress></div>;
}