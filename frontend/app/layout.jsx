import ToasterContext from './contexts/ToasterContext'
import AuthContext from './contexts/AuthContext'
// import ActiveStatus from './components/ActiveStatus'

import 'bootswatch/dist/darkly/bootstrap.min.css';
import './globals.css'

export const metadata = {
  title: 'Twitter Clone',
  description: 'Twitter Clone',
}

export default function RootLayout({children})
{
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToasterContext />
          {/* <ActiveStatus /> */}
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
