// App.js
import { Channel, ChannelList, SendBirdProvider } from '@sendbird/uikit-react';
import { useState } from 'react';
import '@sendbird/uikit-react/dist/index.css';

const APP_ID = '2DDEB71C-A50F-4092-859B-05CF4A17E07F';  // Substitua pelo seu ID de aplicativo Sendbird
const USER_ID = 'user123'; // Substitua pelo seu ID de usuário

function App() {
  const [currentChannelUrl, setCurrentChannelUrl] = useState('');

  return (
    <div className="App">
      <SendBirdProvider appId={APP_ID} userId={USER_ID} theme="dark">
        <>
          <Channel channelUrl={currentChannelUrl} />
          <ChannelList
            onChannelSelect={(channel) => {
              if (channel?.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
            renderHeader={() => <div>My Header</div>}
          />
        </>
      </SendBirdProvider>
    </div>
  );
}

export default App;
