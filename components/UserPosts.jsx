import { useState, useEffect } from 'react';

export default function UserPosts({ userId }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки данных: ${response.status}`);
                }
                const postsData = await response.json();
                setPosts(postsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserPosts();
    }, [userId]);

    if (loading) return <Spinner />;
    if (error) return <div className='error'>ERROR {error}</div>;

    return (
        <div>
            <h2>Посты пользователя</h2>
            {posts.map(post => (
                <div key={post.id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

function Spinner() {
    return <div><progress></progress></div>;
}