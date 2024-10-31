import { useState } from 'react';
import FetchUsers from '@/components/FetchUsers';

export default function DelayedUsersPage() {
    const [showTable, setShowTable] = useState(false);

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'address', label: 'Address', render: (user) => `${user.address.street}, ${user.address.city}` },
        { key: 'phone', label: 'Phone' },
        { key: 'website', label: 'Website' },
        { key: 'company', label: 'Company', render: (user) => user.company.name }
    ];

    return (
        <div>
            <h1>Список пользователей</h1>
            {!showTable ? (
                <button onClick={() => setShowTable(true)}>Показать таблицу</button>
            ) : (
                <FetchUsers columns={columns} showTable={showTable} />
            )}
        </div>
    );
}