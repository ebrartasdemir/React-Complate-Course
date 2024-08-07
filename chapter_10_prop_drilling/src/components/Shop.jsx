
export default function Shop(props) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {props.children}
      </ul>
    </section>
  );
}
