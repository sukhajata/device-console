import React from "react";
import Header from "../../components/Header";

const MessageStatsScreen = ({ history }) => (
    <>
    <Header history={history} title="Message Stats" backVisible={true} onBack={() => history.goBack()}/>
    <iframe
        title="Message data"
        style={{ width: "100%", height: window.innerHeight - 100, marginTop: 70 }}
        src="https://app.powerbi.com/view?r=eyJrIjoiOTU1MzhiNjktMTJiMS00NjRjLWJlYjYtNmJlNTc3NjRjYjRkIiwidCI6IjUxNTM1MjY0LTRkZjQtNDQ4MC04NzFjLWMxMDc1ZDA2ZDU3YyJ9"
        frameBorder="0"
        allowFullScreen={true}
    ></iframe>
  </>
);

export default MessageStatsScreen;