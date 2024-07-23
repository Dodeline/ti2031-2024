import Header from './header'
import Footer from './footer'
 
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4">{children}</main>
      <Footer />
    </>
  )
}