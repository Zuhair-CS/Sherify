import '@/styles/globals.css'
import { Nav } from '@/components/Nav'
import { Provider } from '@/components/Provider'
import SplineScene from '@/components/SplineScene'

export const metadata = {
  title: 'Sherify',
  description: 'Share your thoughts with the world using Sherify!',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* Background Layer */}
        <SplineScene />

        {/* Foreground App Content */}
        <Provider>
          <div className="app">
            <Nav />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;