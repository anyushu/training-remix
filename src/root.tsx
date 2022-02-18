import { Outlet, useCatch } from 'remix'
import type { LinksFunction } from 'remix'
import Document from '~/components/Document'
import Layout from '~/components/Layout'
import globalStylesUrl from '~/styles/global.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: globalStylesUrl }]
}

const App = () => {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

export default App

export const CatchBoundary = () => {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>
      break
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>Hey, developer, you should replace this with what you want your users to see.</p>
        </div>
      </Layout>
    </Document>
  )
}
