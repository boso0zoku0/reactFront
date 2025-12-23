export default function fetchTry() {

  function handleClick() {
    try {
  fetch('http://example.com');
} catch(err) {
  alert(err); // Failed to fetch
}
  }

}