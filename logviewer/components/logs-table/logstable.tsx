import React from "react";

import "./logstable.less";

export default function LogsTable():JSX.Element
{
  return <table className="logs-table">
    <thead>
      <tr>
        <td className="date">DATE</td>
        <td className="type">TYPE</td>
        <td className="group">GROUP</td>
        <td className="name">NAME</td>
      </tr>
    </thead>
    <tbody>
      <tr className="NHENTAI">
        <td className="date">09/21 00:36</td>
        <td className="type">NH</td>
        <td className="group">number2</td>
        <td className="name">(C96) [Kabushikigaisha Toranoana (Various)] TORANOANA Girls Collection 2019 SUMMER TYPE-X</td>
      </tr>
      <tr className="NHENTAI">
        <td className="date">09/21 00:36</td>
        <td className="type">NH</td>
        <td className="group">number2</td>
        <td className="name">(C96) [Kabushikigaisha Toranoana (Various)] TORANOANA Girls Collection 2019 SUMMER TYPE-X</td>
      </tr>
    </tbody>
  </table>;
}