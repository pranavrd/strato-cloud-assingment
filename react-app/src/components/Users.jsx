import { format } from 'date-fns';

function Users({ users }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Human User</th>
                    <th>Create Date</th>
                    <th>Password Change Date</th>
                    <th>Days Since Last Password Change</th>
                    <th>Last Access Date</th>
                    <th>Days Since Last Access</th>
                    <th>MFA Enabled</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.user}>
                        <td>{user.user}</td>
                        <td>{format(new Date(user.created_date),'MMM-dd-yyyy')}</td>
                        <td>{format(new Date(user.password_change_date), 'MMM-dd-yyyy')}</td>
                        <td>{user.days_since_password_change}</td>
                        <td>{format(new Date(user.last_login),'MMM-dd-yyyy')}</td>
                        <td>{user.days_since_last_login}</td>
                        <td>{user.mfa_enabled ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Users;