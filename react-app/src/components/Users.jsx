import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

function Users({ users }) {
    const isPasswordStale = (passwordChangeDate) => {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return new Date(passwordChangeDate) < oneYearAgo;
    };

    const isLoginStale = (lastLogin) => {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
        return new Date(lastLogin) < ninetyDaysAgo;
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Create Date</TableCell>
                        <TableCell>Password Change Date</TableCell>
                        <TableCell>Days Since Password Change</TableCell>
                        <TableCell>Last Login</TableCell>
                        <TableCell>Days Since Last Login</TableCell>
                        <TableCell>MFA Enabled</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => {
                        const passwordStale = isPasswordStale(user.password_change_date);
                        const loginStale = isLoginStale(user.last_login);

                        let backgroundColor = 'inherit';
                        let tooltip = '';
                        if (passwordStale && loginStale) {
                            backgroundColor = '#ff4d4d'; 
                            tooltip = 'Password is stale and last login is stale';
                        } else if (passwordStale) {
                            backgroundColor = '#ff9999'; 
                            tooltip = 'Password is stale';
                        } else if (loginStale) {
                            backgroundColor = '#ffd6d6';
                            tooltip = 'Last login is stale';
                        }

                        // Wrap TableRow with title for tooltip

                        return (
                            <TableRow
                                key={user.user}
                                sx={{
                                    backgroundColor,
                                }}
                                title={tooltip}
                            >
                                <TableCell>{user.user}</TableCell>
                                <TableCell>{format(new Date(user.created_date), 'MMM-dd-yyyy')}</TableCell>
                                <TableCell>{format(new Date(user.password_change_date), 'MMM-dd-yyyy')}</TableCell>
                                <TableCell>{user.days_since_password_change}</TableCell>
                                <TableCell>{format(new Date(user.last_login), 'MMM-dd-yyyy')}</TableCell>
                                <TableCell>{user.days_since_last_login}</TableCell>
                                <TableCell>{user.mfa_enabled ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Users;