import { sectionOrder } from './content/site';

export function App() {
  return <main>{sectionOrder.map((id) => <section className="section" id={id} key={id}><div className="container">{id === 'home' ? <h1>JAY Builders</h1> : <h2>{id.replaceAll('-', ' ')}</h2>}</div></section>)}</main>;
}
