import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://zealthy-db248ad65a1c.herokuapp.com/user');
        setUsers(res.data);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='table-container'>
      <div style={styles.container}>
        <h2 style={styles.title}>User Data</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Email</th>
              <th style={styles.headerCell}>Name</th>
              <th style={styles.headerCell}>Address</th>
              <th style={styles.headerCell}>Birthdate</th>
              <th style={styles.headerCell}>About Me</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} style={styles.row}>
                  <td style={styles.cell}>{user.email}</td>
                  <td style={styles.cell}>{user.firstName + " " + user.lastName}</td>
                  <td style={styles.cell}>
                    {user.address.street}, {user.address.city}, {user.address.state} {user.address.zip}
                  </td>
                  <td style={styles.cell}>{user.birthdate}</td>
                  <td style={styles.cell}>{user.aboutMe}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={styles.noData}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerCell: {
    padding: '12px 15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    textAlign: 'left',
    fontSize: '16px',
  },
  cell: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  row: {
    backgroundColor: '#f9f9f9',
  },
  noData: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#777',
    padding: '20px',
  }
};

export default DataTable;
