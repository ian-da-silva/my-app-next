// ---------------------------------
// components/landing/search-bar.tsx
// ---------------------------------
export function SearchBar() {
  return (
    <form action="/search" className="join w-full max-w-2xl">
      <input name="q" className="input input-bordered join-item w-full" placeholder="Busque por título, editor, mecânica..." />
      <select name="category" className="select select-bordered join-item hidden sm:block">
        <option value="">Todas</option>
        <option>Euro</option>
        <option>Ameritrash</option>
        <option>Família</option>
        <option>Party</option>
        <option>Miniaturas</option>
      </select>
      <button className="btn btn-primary join-item" type="submit">Pesquisar</button>
    </form>
  );
}