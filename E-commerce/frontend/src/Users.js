import React from 'react';

const Users = (data) => {
  return (
    <tr>
      <td>{data.data.name}</td>
      <td>{data.data.email}</td>
    </tr>
  );
}

export default Users;
