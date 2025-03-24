export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      {/* <Nav /> */}
      {props.children}
      {/* <Footer> /> */}
    </>
  )
}
