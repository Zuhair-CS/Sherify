import '@/styles/globals.css'
import { Nav } from '@/components/Nav'
import { Provider } from '@/components/Provider'
import SplineScene from '@/components/SplineScene'

export const metadata = {
  title: 'sherify',
  description: 'This is my description in app/layout.jsx',
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