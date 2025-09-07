export default function Filters({
  categories,
  selectedCategory,
  onCategory,
  search,
  onSearch,
  sort,
  onSort
}) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
      <input value={search} onChange={(e)=>onSearch(e.target.value)} placeholder="Search products..." className="flex-1 p-2 border rounded" />
      <select value={selectedCategory||""} onChange={(e)=>onCategory(e.target.value)} className="p-2 border rounded mt-2 md:mt-0">
        <option value="">All categories</option>
        {categories.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={sort} onChange={(e)=>onSort(e.target.value)} className="p-2 border rounded mt-2 md:mt-0">
        <option value="">Sort</option>
        <option value="price-asc">Price: low → high</option>
        <option value="price-desc">Price: high → low</option>
      </select>
    </div>
  );
}
