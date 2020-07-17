import React from 'react';
import ReactDom from 'react-dom';
import { useState, useEffect } from 'react';
import { FriendStatus, FriendListItem, Chat } from './effectItem';


const friendList = [
  { id: 1, name: 'Phoebe', isOnline:'Online'},
  { id: 2, name: 'Rachel', isOnline:'Offline'},
  { id: 3, name: 'Ross', isOnline:'Online'},
];

export default function(){
  return(
    <div>
      <FriendStatus friends={friendList} />
      <FriendListItem friends={friendList} />
      <Chat friends={friendList}/>
    </div>
  )
}
