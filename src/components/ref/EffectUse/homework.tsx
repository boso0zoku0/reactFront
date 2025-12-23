import {useEffect, useRef, useState} from 'react';
import {resume} from "react-dom/server";

function fetchBio(name) {

  return new Promise((resolve) => {
    const timerId = setTimeout(() => {
      resolve(`Name: ${name}`)
    }, 2000)
  })
}

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);
  useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    }
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr/>
      <p><i>{bio ?? 'Loading...'}</i></p>
    </>
  );
}
