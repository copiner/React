
/*
If you’re familiar with React class lifecycle methods, you can think of useEffect Hook
as componentDidMount, componentDidUpdate, and componentWillUnmount combined.

If your effect returns a function, React will run it when it is time to clean up

this is the optional cleanup mechanism for effects.
Every effect may return a function that cleans up after it. This lets us keep the logic for adding and removing subscriptions close to each other.
They’re part of the same effect

Just like you can use the State Hook more than once, you can also use several effects.
This lets us separate unrelated logic into different effects
*/
import React, { useState, useEffect } from 'react';

//Building Your Own Hooks
export function useFriendStatus(id,data) {

  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {//返回函数
    let item = data[id-1];

    function handleStatusChange(status) {
      setIsOnline(status);
    }
    function subscribed(id, handleStatusChange){
      //item.isOnline = 'Online';
      //console.log(item)
      handleStatusChange(item.isOnline);
    }
    function unsubscribed(id, handleStatusChange){
      //item.isOnline = 'Offline';
      handleStatusChange(item.isOnline);
    }

    subscribed(id, handleStatusChange);
    return () => {
      unsubscribed(id, handleStatusChange);
    };

  });

  useEffect(() => {//side effects
    //console.log('anyone')
  });

  console.log(isOnline);
  return isOnline;
}

export function FriendStatus(props) {
  const isOnline = useFriendStatus(1, props.friends);

  return isOnline ? 'Online' : 'Offline';
}

export function FriendListItem(props) {

  const isOnline = useFriendStatus(1, props.friends);
  return (
    <ul>
      <li style={{ color: isOnline ? 'green' : 'black' }}>
        {props.friends.name}
      </li>
    </ul>
  );
}

export function Chat(props) {

  const [recipient, setRecipient] = useState(1);
  const isRecipientOnline = useFriendStatus(recipient,props.friends);

  return (
    <div>
      <div>{isRecipientOnline}</div>
      <select onChange={e => setRecipient(Number(e.target.value))}>
         {props.friends.map(friend => (
           <option key={friend.id} value={friend.id}>
             {friend.name}
           </option>
         ))}
       </select>
    </div>
  );
}

/*
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}

useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新

useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // 仅在 props.friend.id 发生变化时，重新订阅
*/
