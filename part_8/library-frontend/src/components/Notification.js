import React from "react";
import { useState } from "react";
import { useSubscription } from "@apollo/client";
import { BOOKS_FILTERED, BOOK_ADDED } from "../queries";
import { useApolloClient } from "@apollo/client";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const Notification = () => {
  const [notification, setNotification] = useState("");
  const client = useApolloClient();

  const notify = (notification) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  useSubscription(BOOK_ADDED, {
    onData: (subscriptionData) => {
      const bookAdded = subscriptionData.data.data.bookAdded;
      notify(`${bookAdded.title} by ${bookAdded.author.name} added`);
      updateCache(
        client.cache,
        { query: BOOKS_FILTERED, variables: { genre: "" } },
        bookAdded
      );
    },
  });

  return <div>{notification}</div>;
};

export default Notification;
