export default function UsersTable({ users, columns }) {
    return <>
        <table border="1" cellPadding="10">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        {columns.map((col) => (
                            <td key={col.key}>{col.render ? col.render(user) : user[col.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}