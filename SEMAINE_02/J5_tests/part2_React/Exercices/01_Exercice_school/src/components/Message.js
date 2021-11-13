import React from "react";

const Message = ({ content, type }) =>  <p className={`${type}`}>{content}</p>;

export default Message;