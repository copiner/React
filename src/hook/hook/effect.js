import React, { useState, useEffect } from 'react';

function useFriendStatus(friend) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {//返回函数

    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    function subscribed(friend, handleStatusChange){
      friend.status.isOnline = 'Online';
      handleStatusChange(friend.status);
    }
    function unsubscribed(friend, handleStatusChange){
      friend.status.isOnline = 'Offline';
      handleStatusChange(friend.status);
    }

    subscribed(friend, handleStatusChange);
    return () => {
      unsubscribed(friend, handleStatusChange);
    };

  });

  return isOnline;
}

export function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

export function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend);

  return (
    <ul>
      <li style={{ color: isOnline ? 'green' : 'black' }}>
        {props.friend.name}
      </li>
    </ul>
  );
}
