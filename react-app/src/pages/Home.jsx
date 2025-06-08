import { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Switch, FormControlLabel } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Users from '../components/Users';

function Home() {
  const [users, setUsers] = useState([]);
  const [showActive, setShowActive] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [showActive]);

  const fetchUsers = async () => {
    console.log('Fetching users, showActive:', showActive);
    const url = showActive ? '/api/users?active=yes' : '/api/users';
    const response = await axios.get(`http://localhost:8081${url}`);
    setUsers(response.data);
    // TODO : handle prefetch
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Users Dashboard
          </Typography>
          <IconButton color="inherit" href="https://github.com/pranavrd/strato-cloud-assingment/" target="_blank">
            <GitHubIcon />
          </IconButton>
          <IconButton color="inherit" href="https://linkedin.com/in/pranav-doshetty" target="_blank">
            <LinkedInIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <FormControlLabel
        control={<Switch checked={showActive} onChange={() => setShowActive(!showActive)} />}
        label="MFA Enabled"
      />
      <Users users={users}/>
    </div>
  );
}

export default Home;