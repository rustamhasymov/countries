import { merge } from "lodash";
import { useEffect, useState } from "react";

const initialState = {
  id: 1,
  username: "user",
  password: "password",
  items: [{ id: 1, name: "item1" }],
  address: { country: "country", city: "city", zip: "zip" },
};
const changes = [
  {
    phone: "123456789",
    user: "new user",
    password: "123456",
    items: [
      { id: 1, name: "item1" },
      { id: 2, name: "item2" },
    ],
    address: { country: "USA" },
  },
  {
    email: "example@gmail.com",
    username: "example",
    address: { city: "New York" },
  },
  { phone: "987654321", address: { zip: "12345" } },
];

const calculateState = (initialState, changes) => {
  return merge(initialState, ...changes);
};

export const FirstTask = () => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(calculateState(initialState, changes));
  }, []);

  useEffect(() => {
    console.dir(value);
  }, [value]);

  return <div></div>;
};
